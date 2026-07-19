from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "campaign" / "tube-ads"

VAN = ROOT / "public" / "cartoons" / "van1.jpeg"
LOGO_DARK = ROOT / "public" / "img" / "geologodark.png"
LOGO_WHITE = ROOT / "public" / "img" / "geologowhite.png"

WEBSITE = "www.geogasservices.uk"
PHONE_LONDON = "0207 723 2221"
PHONE_SUSSEX = "01444 212 395"
PHONE_247 = "07854 451 941"

RED = (218, 22, 30)
RED_DARK = (118, 7, 13)
BLACK = (9, 10, 13)
CHARCOAL = (22, 24, 30)
WHITE = (255, 255, 255)
OFFWHITE = (246, 247, 249)
YELLOW = (255, 205, 44)
MUTED = (226, 230, 236)


@dataclass(frozen=True)
class TubeAd:
    slug: str
    eyebrow: str
    headline: str
    subline: str
    cta: str
    theme: str


ADS = [
    TubeAd(
        slug="every-home-needs-superheroes",
        eyebrow="GEO GAS SERVICES",
        headline="BOILER REPAIR HEROES",
        subline="Fast boiler diagnostics, repairs and heating support across London & Sussex.",
        cta="24/7 boiler help. Competitive monthly cover.",
        theme="red",
    ),
    TubeAd(
        slug="van-on-call",
        eyebrow="LOCAL ENGINEERS ON THE ROAD",
        headline="WHEN YOUR BOILER CALLS, OUR HEROES ROLL.",
        subline="Breakdowns, pressure faults, no heating and no hot water call-outs.",
        cta="Book a boiler repair visit today.",
        theme="dark",
    ),
    TubeAd(
        slug="home-rescue-cover",
        eyebrow="BOILER COVER",
        headline="BOILER COVER, PARKED OUTSIDE.",
        subline="Flexible monthly plans for boiler breakdowns, heating faults and annual peace of mind.",
        cta="Ask about GEO Starter and GEO Complete cover.",
        theme="light",
    ),
    TubeAd(
        slug="twenty-four-seven",
        eyebrow="24/7 SUPPORT",
        headline="BOILER HELP IS NEVER FAR AWAY.",
        subline="The GEO Gas van is ready for boiler breakdowns, repairs and cover customers.",
        cta="Call now for boiler repair or cover.",
        theme="yellow",
    ),
]


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    paths = [
        Path("C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf"),
        Path("C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf"),
    ]
    for path in paths:
        if path.exists():
            return ImageFont.truetype(str(path), size)
    return ImageFont.load_default()


def text_width(draw: ImageDraw.ImageDraw, text: str, fnt: ImageFont.FreeTypeFont) -> int:
    box = draw.textbbox((0, 0), text, font=fnt)
    return box[2] - box[0]


def wrap(draw: ImageDraw.ImageDraw, text: str, fnt: ImageFont.FreeTypeFont, max_width: int) -> list[str]:
    lines: list[str] = []
    line = ""
    for word in text.split():
        candidate = f"{line} {word}".strip()
        if not line or text_width(draw, candidate, fnt) <= max_width:
            line = candidate
        else:
            lines.append(line)
            line = word
    if line:
        lines.append(line)
    return lines


def fit_font(draw: ImageDraw.ImageDraw, text: str, max_width: int, start: int, minimum: int, bold: bool = True) -> ImageFont.FreeTypeFont:
    for size in range(start, minimum - 1, -2):
        fnt = font(size, bold)
        if all(text_width(draw, line, fnt) <= max_width for line in wrap(draw, text, fnt, max_width)):
            return fnt
    return font(minimum, bold)


def draw_wrapped(draw: ImageDraw.ImageDraw, x: int, y: int, text: str, fnt: ImageFont.FreeTypeFont, fill, max_width: int, gap: int, stroke: int = 0) -> int:
    for line in wrap(draw, text, fnt, max_width):
        draw.text((x, y), line, font=fnt, fill=fill, stroke_width=stroke, stroke_fill=BLACK)
        box = draw.textbbox((x, y), line, font=fnt, stroke_width=stroke)
        y = box[3] + gap
    return y


def draw_logo(img: Image.Image, path: Path, box: tuple[int, int, int, int]) -> None:
    logo = Image.open(path).convert("RGBA")
    x1, y1, x2, y2 = box
    scale = min((x2 - x1) / logo.width, (y2 - y1) / logo.height)
    logo = logo.resize((int(logo.width * scale), int(logo.height * scale)), Image.Resampling.LANCZOS)
    img.alpha_composite(logo, (x1, y1 + (y2 - y1 - logo.height) // 2))


def van_layer(max_size: tuple[int, int]) -> Image.Image:
    van = Image.open(VAN).convert("RGBA")
    van.thumbnail(max_size, Image.Resampling.LANCZOS)
    return van


def draw_background(draw: ImageDraw.ImageDraw, size: tuple[int, int], theme: str) -> tuple[tuple[int, int, int], tuple[int, int, int], Path]:
    w, h = size
    if theme == "light":
        draw.rectangle((0, 0, w, h), fill=OFFWHITE)
        draw.rectangle((0, 0, w, 34), fill=RED)
        for x in range(-400, w, 260):
            draw.polygon([(x, h), (x + 130, h), (x + 850, 0), (x + 720, 0)], fill=(230, 232, 237))
        return BLACK, RED, LOGO_DARK
    if theme == "yellow":
        draw.rectangle((0, 0, w, h), fill=YELLOW)
        for x in range(-200, w, 230):
            draw.line((x, 0, x + 760, h), fill=(RED[0], RED[1], RED[2], 80), width=14)
        return BLACK, RED, LOGO_DARK
    if theme == "dark":
        draw.rectangle((0, 0, w, h), fill=BLACK)
        for y in range(0, h, 130):
            draw.line((0, y, w, y - 280), fill=(RED[0], RED[1], RED[2], 90), width=10)
        return WHITE, YELLOW, LOGO_WHITE

    draw.rectangle((0, 0, w, h), fill=RED_DARK)
    for y in range(h):
        alpha = y / h
        r = int(RED_DARK[0] * (1 - alpha) + BLACK[0] * alpha)
        g = int(RED_DARK[1] * (1 - alpha) + BLACK[1] * alpha)
        b = int(RED_DARK[2] * (1 - alpha) + BLACK[2] * alpha)
        draw.line((0, y, w, y), fill=(r, g, b))
    for x in range(-300, w, 250):
        draw.line((x, 0, x + 950, h), fill=(255, 255, 255, 40), width=9)
    return WHITE, YELLOW, LOGO_WHITE


def render(ad: TubeAd) -> Path:
    size = (3840, 1600)
    w, h = size
    img = Image.new("RGBA", size, WHITE + (255,))
    draw = ImageDraw.Draw(img, "RGBA")
    text_fill, accent, logo_path = draw_background(draw, size, ad.theme)

    # Top brand rail.
    rail_h = 210
    rail_fill = BLACK
    rail_text = WHITE
    draw.rounded_rectangle((90, 70, w - 90, 70 + rail_h), radius=28, fill=rail_fill + (235,), outline=RED, width=8)
    draw_logo(img, LOGO_WHITE, (135, 103, 560, 245))
    draw.text((w - 1060, 112), WEBSITE, font=font(54, True), fill=rail_text)
    draw.text((w - 1060, 184), f"London {PHONE_LONDON}  |  Sussex {PHONE_SUSSEX}", font=font(38, True), fill=accent)

    # Main van centerpiece with a grounded shadow.
    van = van_layer((2350, 780))
    van_x = (w - van.width) // 2
    van_y = 625
    shadow = Image.new("RGBA", (van.width, 160), (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    sd.ellipse((120, 20, van.width - 120, 130), fill=(0, 0, 0, 85))
    shadow = shadow.filter(ImageFilter.GaussianBlur(24))
    img.alpha_composite(shadow, (van_x, van_y + van.height - 70))
    img.alpha_composite(van, (van_x, van_y))

    # Copy block.
    copy_x = 150
    copy_y = 355
    copy_w = 1400
    pill_f = font(40, True)
    pill_w = text_width(draw, ad.eyebrow, pill_f) + 70
    draw.rounded_rectangle((copy_x, copy_y, copy_x + pill_w, copy_y + 74), radius=14, fill=accent + (255,))
    draw.text((copy_x + 35, copy_y + 16), ad.eyebrow, font=pill_f, fill=BLACK if accent == YELLOW else WHITE)

    headline_f = fit_font(draw, ad.headline, copy_w, 128, 70, True)
    y = copy_y + 105
    y = draw_wrapped(draw, copy_x, y, ad.headline, headline_f, text_fill, copy_w, 6, 3 if text_fill == WHITE else 0)
    sub_f = fit_font(draw, ad.subline, copy_w, 54, 34, False)
    y = draw_wrapped(draw, copy_x, y + 22, ad.subline, sub_f, text_fill if ad.theme != "dark" else MUTED, copy_w, 8, 1 if text_fill == WHITE else 0)

    # CTA plate.
    cta = ad.cta
    cta_f = fit_font(draw, cta, 1280, 48, 30, True)
    cta_h = 108
    cta_y = 1245
    draw.rounded_rectangle((150, cta_y, 1500, cta_y + cta_h), radius=20, fill=BLACK + (240,), outline=YELLOW, width=5)
    box = draw.textbbox((0, 0), cta, font=cta_f)
    draw.text((190, cta_y + (cta_h - (box[3] - box[1])) // 2 - 2), cta, font=cta_f, fill=YELLOW)

    # Bottom contact rail.
    footer_h = 155
    fy = h - footer_h
    draw.rectangle((0, fy, w, h), fill=RED)
    draw.rectangle((0, fy, w, fy + 12), fill=YELLOW)
    contact = f"{WEBSITE}  |  London {PHONE_LONDON}  |  Sussex {PHONE_SUSSEX}  |  24/7 {PHONE_247}"
    contact_f = fit_font(draw, contact, w - 220, 50, 30, True)
    box = draw.textbbox((0, 0), contact, font=contact_f)
    draw.text(((w - (box[2] - box[0])) // 2, fy + 52), contact, font=contact_f, fill=WHITE)

    out = OUT / f"geogas-van-tube-ad-{ad.slug}.png"
    OUT.mkdir(parents=True, exist_ok=True)
    img.convert("RGB").save(out, quality=96)
    return out


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    rows = ["Asset,Headline,File"]
    for ad in ADS:
        path = render(ad)
        rows.append(f"{ad.slug},{ad.headline},{path}")
        print(path)
    (OUT / "van-tube-ads-manifest.csv").write_text("\n".join(rows), encoding="utf-8")


if __name__ == "__main__":
    main()
