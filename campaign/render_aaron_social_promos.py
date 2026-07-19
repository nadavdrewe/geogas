from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "campaign" / "social-promos"

LOGO = ROOT / "public" / "img" / "geologowhite.png"
PHONE_MAIN = "01444 212 395"
PHONE_LONDON = "0207 723 2221"
PHONE_EMERGENCY = "07854 451 941"
WEBSITE = "www.geogasservices.uk"

RED = (218, 22, 30)
BLACK = (9, 10, 13)
WHITE = (255, 255, 255)
YELLOW = (255, 205, 44)
MUTED = (232, 235, 240)


@dataclass(frozen=True)
class Promo:
    slug: str
    source: Path
    eyebrow: str
    headline: str
    subline: str
    cta: str
    x_bias: float = 0.5
    y_bias: float = 0.5


PROMOS = [
    Promo(
        slug="aaron-boiler-breakdown",
        source=ROOT / "campaign" / "source-art" / "aaron-boiler-hero.png",
        eyebrow="GEO GAS SERVICES",
        headline="BOILER BREAKDOWN?",
        subline="Fast, qualified help from the Gas Superheroes",
        cta="Call now for boiler, gas and heating support",
        x_bias=0.54,
    ),
    Promo(
        slug="aaron-emergency-repair",
        source=ROOT / "campaign" / "source-art" / "aaron-boiler-repair-customer.png",
        eyebrow="24/7 EMERGENCY SUPPORT",
        headline="HEATING HEROES ON CALL",
        subline="Boiler repairs, diagnostics and urgent home call-outs",
        cta="London and Sussex coverage",
        x_bias=0.54,
    ),
    Promo(
        slug="aaron-home-cover",
        source=ROOT / "campaign" / "source-art" / "aaron-home-cover-family.png",
        eyebrow="HOME COVER HEROES",
        headline="PEACE OF MIND FOR YOUR HOME",
        subline="Boiler, heating, plumbing and safety support",
        cta="Ask about GEO Gas home rescue cover",
        x_bias=0.48,
    ),
    Promo(
        slug="aaron-van-callout",
        source=ROOT / "campaign" / "source-art" / "aaron-boiler-hero.png",
        eyebrow="LOCAL HEROES ON THE ROAD",
        headline="FAST CALLOUTS",
        subline="Boiler, gas and heating support across London & Sussex",
        cta="Book a GEO Gas superhero visit today",
        x_bias=0.78,
    ),
]

SPECS = [
    ("instagram-square", (2160, 2160)),
    ("instagram-portrait", (2160, 2700)),
    ("instagram-story", (2160, 3840)),
    ("facebook-landscape", (2400, 1256)),
]


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    candidates = [
        Path("C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf"),
        Path("C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf"),
    ]
    for path in candidates:
        if path.exists():
            return ImageFont.truetype(str(path), size)
    return ImageFont.load_default()


def text_width(draw: ImageDraw.ImageDraw, text: str, fnt: ImageFont.FreeTypeFont) -> int:
    box = draw.textbbox((0, 0), text, font=fnt)
    return box[2] - box[0]


def wrap(draw: ImageDraw.ImageDraw, text: str, fnt: ImageFont.FreeTypeFont, max_width: int) -> list[str]:
    lines: list[str] = []
    for paragraph in text.splitlines():
        line = ""
        for word in paragraph.split():
            candidate = f"{line} {word}".strip()
            if not line or text_width(draw, candidate, fnt) <= max_width:
                line = candidate
            else:
                lines.append(line)
                line = word
        if line:
            lines.append(line)
    return lines


def fitted_font(draw: ImageDraw.ImageDraw, text: str, max_width: int, start: int, minimum: int, bold: bool) -> ImageFont.FreeTypeFont:
    for size in range(start, minimum - 1, -2):
        fnt = font(size, bold)
        if all(text_width(draw, line, fnt) <= max_width for line in wrap(draw, text, fnt, max_width)):
            return fnt
    return font(minimum, bold)


def cover(path: Path, size: tuple[int, int], x_bias: float, y_bias: float) -> Image.Image:
    img = Image.open(path).convert("RGB")
    sw, sh = size
    scale = max(sw / img.width, sh / img.height) * 1.02
    nw, nh = int(img.width * scale), int(img.height * scale)
    img = img.resize((nw, nh), Image.Resampling.LANCZOS)
    left = int((nw - sw) * x_bias)
    top = int((nh - sh) * y_bias)
    return img.crop((left, top, left + sw, top + sh))


def draw_logo(img: Image.Image, box: tuple[int, int, int, int]) -> None:
    logo = Image.open(LOGO).convert("RGBA")
    x1, y1, x2, y2 = box
    max_w = x2 - x1
    max_h = y2 - y1
    scale = min(max_w / logo.width, max_h / logo.height)
    logo = logo.resize((int(logo.width * scale), int(logo.height * scale)), Image.Resampling.LANCZOS)
    img.alpha_composite(logo, (x1, y1 + (max_h - logo.height) // 2))


def draw_wrapped(draw: ImageDraw.ImageDraw, x: int, y: int, text: str, fnt: ImageFont.FreeTypeFont, fill, max_width: int, gap: int, stroke: int = 0) -> int:
    for line in wrap(draw, text, fnt, max_width):
        draw.text((x, y), line, font=fnt, fill=fill, stroke_width=stroke, stroke_fill=BLACK)
        box = draw.textbbox((x, y), line, font=fnt, stroke_width=stroke)
        y = box[3] + gap
    return y


def shade(img: Image.Image) -> Image.Image:
    w, h = img.size
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    px = overlay.load()
    for y in range(h):
        alpha = int(28 + 118 * (y / max(1, h - 1)))
        for x in range(w):
            side = max(0, 1 - x / max(1, w * 0.58))
            px[x, y] = (0, 0, 0, min(178, alpha + int(85 * side)))
    return Image.alpha_composite(img.convert("RGBA"), overlay)


def render(promo: Promo, suffix: str, size: tuple[int, int]) -> Path:
    w, h = size
    img = cover(promo.source, size, promo.x_bias, promo.y_bias)
    img = ImageEnhance.Color(img).enhance(1.08)
    img = ImageEnhance.Contrast(img).enhance(1.05)
    img = shade(img)
    draw = ImageDraw.Draw(img)

    margin = int(w * 0.055)
    header_h = int(h * (0.13 if h > w else 0.18))
    draw.rounded_rectangle((margin, margin, w - margin, margin + header_h), radius=max(22, w // 72), fill=(BLACK[0], BLACK[1], BLACK[2], 232), outline=RED, width=max(6, w // 240))
    draw_logo(img, (margin + int(w * 0.035), margin + int(header_h * 0.22), margin + int(w * 0.39), margin + int(header_h * 0.78)))

    phone = PHONE_EMERGENCY if "EMERGENCY" in promo.eyebrow else PHONE_LONDON
    phone_f = fitted_font(draw, phone, int(w * 0.32), max(52, w // 31), 30, True)
    draw.text((w - margin - int(w * 0.34), margin + int(header_h * 0.28)), "CALL", font=font(max(26, w // 75), True), fill=YELLOW)
    draw.text((w - margin - int(w * 0.34), margin + int(header_h * 0.52)), phone, font=phone_f, fill=WHITE)

    panel_h = int(h * (0.31 if h > w else 0.40))
    panel_y = int(h * (0.51 if h > w else 0.42))
    draw.rounded_rectangle((margin, panel_y, w - margin, panel_y + panel_h), radius=max(20, w // 70), fill=(BLACK[0], BLACK[1], BLACK[2], 224), outline=YELLOW, width=max(6, w // 260))

    inner_x = margin + int(w * 0.045)
    inner_w = w - margin * 2 - int(w * 0.09)
    eyebrow_f = fitted_font(draw, promo.eyebrow, inner_w, max(40, w // 44), 26, True)
    headline_f = fitted_font(draw, promo.headline, inner_w, max(92, w // 13), 48, True)
    sub_f = fitted_font(draw, promo.subline, inner_w, max(44, w // 34), 30, False)
    cta_f = fitted_font(draw, promo.cta, inner_w, max(36, w // 42), 26, True)

    y = panel_y + int(panel_h * 0.13)
    y = draw_wrapped(draw, inner_x, y, promo.eyebrow, eyebrow_f, RED, inner_w, max(8, h // 180))
    y = draw_wrapped(draw, inner_x, y + int(panel_h * 0.02), promo.headline, headline_f, YELLOW, inner_w, max(8, h // 170), 2)
    y = draw_wrapped(draw, inner_x, y + int(panel_h * 0.03), promo.subline, sub_f, WHITE, inner_w, max(8, h // 190), 1)
    draw_wrapped(draw, inner_x, y + int(panel_h * 0.025), promo.cta, cta_f, MUTED, inner_w, max(8, h // 200), 1)

    strip_h = int(h * (0.095 if h > w else 0.12))
    y1 = h - strip_h
    draw.rectangle((0, y1, w, h), fill=(RED[0], RED[1], RED[2], 248))
    draw.rectangle((0, y1, w, y1 + max(10, h // 135)), fill=YELLOW)
    contact = f"{WEBSITE}  |  London {PHONE_LONDON}  |  Sussex {PHONE_MAIN}  |  24/7 {PHONE_EMERGENCY}"
    contact_f = fitted_font(draw, contact, int(w * 0.92), max(44, w // 42), 24, True)
    box = draw.textbbox((0, 0), contact, font=contact_f)
    draw.text(((w - (box[2] - box[0])) // 2, y1 + (strip_h - (box[3] - box[1])) // 2 - 2), contact, font=contact_f, fill=WHITE)

    out = OUT / f"geogas-{promo.slug}-{suffix}.png"
    img.convert("RGB").save(out, quality=96)
    return out


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    rows = ["Asset,Source,Instagram Square,Instagram Portrait,Instagram Story,Facebook Landscape"]
    for promo in PROMOS:
        rendered: dict[str, Path] = {}
        for suffix, size in SPECS:
            rendered[suffix] = render(promo, suffix, size)
            print(rendered[suffix])
        rows.append(
            f"{promo.slug},{promo.source},{rendered['instagram-square']},{rendered['instagram-portrait']},{rendered['instagram-story']},{rendered['facebook-landscape']}"
        )
    (OUT / "social-promos-manifest.csv").write_text("\n".join(rows), encoding="utf-8")


if __name__ == "__main__":
    main()
