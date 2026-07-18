from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "campaign" / "competition-mockups"
HIRES_OUT = ROOT / "campaign" / "competition-hires"

ASSETS = {
    "van": ROOT / "public" / "cartoons" / "van1.jpeg",
    "comic": ROOT / "public" / "cartoons" / "comics" / "comic-gas-leak-plumbing-hero-grid-yellow-bg.png",
    "boiler_hero": ROOT / "campaign" / "generated-hero-art" / "win-a-boiler-hero-bearded.png",
    "subscription_hero": ROOT / "campaign" / "generated-hero-art" / "win-a-yearly-subscription-hero-bearded.png",
    "logo_dark": ROOT / "public" / "img" / "geologodark.png",
}

RED = (218, 22, 30)
RED_DARK = (117, 7, 12)
BLACK = (12, 14, 18)
CHARCOAL = (22, 25, 31)
WHITE = (255, 255, 255)
YELLOW = (255, 205, 44)
MUTED = (230, 233, 238)
PHONE_MAIN = "01444 212 395"
PHONE_LONDON = "0207 723 2221"
PHONE_EMERGENCY = "07854 451 941"
WEBSITE = "www.geogasservices.uk"


@dataclass(frozen=True)
class Campaign:
    slug: str
    hero_key: str
    eyebrow: str
    headline: str
    subline: str
    entry: str
    note: str


CAMPAIGNS = [
    Campaign(
        slug="win-a-boiler",
        hero_key="boiler_hero",
        eyebrow="GEO GAS GIVEAWAY",
        headline="WIN A BOILER",
        subline="Installed by the GEO Gas Superheroes",
        entry="Follow + Like + Comment HERO",
        note="T&Cs apply. Prize and install scope to be confirmed.",
    ),
    Campaign(
        slug="win-a-yearly-subscription",
        hero_key="subscription_hero",
        eyebrow="GEO GAS GIVEAWAY",
        headline="WIN A YEARLY SUBSCRIPTION",
        subline="A year of GEO Gas peace of mind for your home",
        entry="Follow + Like + Comment HERO",
        note="T&Cs apply. Package level and eligibility to be confirmed.",
    ),
]


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    paths = [
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
        "C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf",
    ]
    for path in paths:
        p = Path(path)
        if p.exists():
            return ImageFont.truetype(str(p), size)
    return ImageFont.load_default()


def cover(path: Path, size: tuple[int, int], zoom: float = 1.0, x_bias: float = 0.5, y_bias: float = 0.5) -> Image.Image:
    img = Image.open(path).convert("RGB")
    sw, sh = size
    scale = max(sw / img.width, sh / img.height) * zoom
    nw, nh = int(img.width * scale), int(img.height * scale)
    img = img.resize((nw, nh), Image.Resampling.LANCZOS)
    left = int((nw - sw) * x_bias)
    top = int((nh - sh) * y_bias)
    return img.crop((left, top, left + sw, top + sh))


def draw_vertical_gradient(img: Image.Image, top_alpha: int, bottom_alpha: int) -> Image.Image:
    w, h = img.size
    grad = Image.new("RGBA", (w, h))
    px = grad.load()
    for y in range(h):
        alpha = int(top_alpha + (bottom_alpha - top_alpha) * y / max(1, h - 1))
        for x in range(w):
            px[x, y] = (0, 0, 0, alpha)
    return Image.alpha_composite(img.convert("RGBA"), grad)


def text_width(draw: ImageDraw.ImageDraw, text: str, fnt: ImageFont.FreeTypeFont) -> int:
    box = draw.textbbox((0, 0), text, font=fnt)
    return box[2] - box[0]


def wrap_lines(draw: ImageDraw.ImageDraw, text: str, fnt: ImageFont.FreeTypeFont, max_width: int) -> list[str]:
    out: list[str] = []
    for paragraph in text.splitlines():
        words = paragraph.split()
        line = ""
        for word in words:
            candidate = f"{line} {word}".strip()
            if not line or text_width(draw, candidate, fnt) <= max_width:
                line = candidate
            else:
                out.append(line)
                line = word
        if line:
            out.append(line)
    return out


def fitted_font(draw: ImageDraw.ImageDraw, text: str, max_width: int, start: int, minimum: int, bold: bool = True) -> ImageFont.FreeTypeFont:
    size = start
    while size > minimum:
        fnt = font(size, bold)
        if all(text_width(draw, line, fnt) <= max_width for line in wrap_lines(draw, text, fnt, max_width)):
            return fnt
        size -= 2
    return font(minimum, bold)


def draw_text(
    draw: ImageDraw.ImageDraw,
    xy: tuple[int, int],
    text: str,
    fnt: ImageFont.FreeTypeFont,
    fill: tuple[int, int, int],
    max_width: int,
    line_gap: int = 8,
    align: str = "left",
    stroke: int = 0,
    stroke_fill: tuple[int, int, int] = BLACK,
) -> int:
    x, y = xy
    for line in wrap_lines(draw, text, fnt, max_width):
        box = draw.textbbox((0, 0), line, font=fnt, stroke_width=stroke)
        lw = box[2] - box[0]
        tx = x if align == "left" else x + (max_width - lw) // 2
        draw.text((tx, y), line, font=fnt, fill=fill, stroke_width=stroke, stroke_fill=stroke_fill)
        y += (box[3] - box[1]) + line_gap
    return y


def rounded_panel(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], fill, outline=None, width: int = 3, radius: int = 18) -> None:
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def draw_logo(img: Image.Image, box: tuple[int, int, int, int]) -> None:
    logo = Image.open(ASSETS["logo_dark"]).convert("RGBA")
    x1, y1, x2, y2 = box
    max_w = x2 - x1
    max_h = y2 - y1
    scale = min(max_w / logo.width, max_h / logo.height)
    logo = logo.resize((int(logo.width * scale), int(logo.height * scale)), Image.Resampling.LANCZOS)
    x = x1 + (max_w - logo.width) // 2
    y = y1 + (max_h - logo.height) // 2
    img.alpha_composite(logo, (x, y))


def draw_header(img: Image.Image, campaign: Campaign, margin: int, header_h: int) -> None:
    draw = ImageDraw.Draw(img)
    w, _ = img.size
    rounded_panel(draw, (margin, margin, w - margin, header_h), (12, 14, 18, 232), RED, 4, 20)
    logo_w = int((w - margin * 2) * 0.38)
    draw_logo(img, (margin + 28, margin + 20, margin + 28 + logo_w, header_h - 20))
    pill_text = campaign.eyebrow
    pill_font = fitted_font(draw, pill_text, int(w * 0.32), int(w * 0.028), 22, True)
    pill_w = text_width(draw, pill_text, pill_font) + 44
    pill_h = int((header_h - margin) * 0.42)
    px2 = w - margin - 28
    px1 = px2 - pill_w
    py1 = margin + ((header_h - margin) - pill_h) // 2
    rounded_panel(draw, (px1, py1, px2, py1 + pill_h), RED, None, radius=12)
    draw.text((px1 + 22, py1 + (pill_h - pill_font.size) // 2 - 3), pill_text, font=pill_font, fill=WHITE)


def draw_cta(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], text: str, max_size: int) -> None:
    x1, y1, x2, y2 = box
    rounded_panel(draw, box, RED, None, radius=14)
    fnt = fitted_font(draw, text.upper(), x2 - x1 - 44, max_size, 22, True)
    tw = text_width(draw, text.upper(), fnt)
    th = draw.textbbox((0, 0), text.upper(), font=fnt)[3]
    draw.text((x1 + (x2 - x1 - tw) // 2, y1 + (y2 - y1 - th) // 2 - 2), text.upper(), font=fnt, fill=WHITE)


def draw_contact_footer(draw: ImageDraw.ImageDraw, size: tuple[int, int], margin: int, top: int) -> None:
    w, h = size
    contact = f"{WEBSITE}  |  London {PHONE_LONDON}  |  Sussex {PHONE_MAIN}  |  24/7 {PHONE_EMERGENCY}"
    fnt = fitted_font(draw, contact, w - margin * 2, int(w * 0.026), 15, True)
    strip_h = max(int(h * 0.062), fnt.size + 28)
    y1 = min(top, h - strip_h - int(h * 0.018))
    rounded_panel(draw, (margin, y1, w - margin, y1 + strip_h), (12, 14, 18, 230), RED, 3, 12)
    box = draw.textbbox((0, 0), contact, font=fnt, stroke_width=1)
    draw.text(
        (margin + (w - margin * 2 - (box[2] - box[0])) // 2, y1 + (strip_h - (box[3] - box[1])) // 2 - 2),
        contact,
        font=fnt,
        fill=WHITE,
        stroke_width=1,
        stroke_fill=BLACK,
    )


def base_canvas(size: tuple[int, int], campaign: Campaign, x_bias: float = 0.50, y_bias: float = 0.50) -> Image.Image:
    bg = cover(ASSETS[campaign.hero_key], size, 1.02, x_bias, y_bias)
    bg = ImageEnhance.Color(bg).enhance(1.08)
    bg = ImageEnhance.Contrast(bg).enhance(1.05)
    img = draw_vertical_gradient(bg, 18, 96)
    draw = ImageDraw.Draw(img)
    w, h = size
    draw.rectangle((0, h - max(12, h // 85), w, h), fill=RED)
    return img


def square_or_portrait(size: tuple[int, int], campaign: Campaign) -> Image.Image:
    w, h = size
    x_bias = 0.56 if campaign.slug == "win-a-boiler" else 0.48
    img = base_canvas(size, campaign, x_bias, 0.50)
    draw = ImageDraw.Draw(img)
    margin = int(w * 0.06)
    header_h = int(h * 0.17)
    draw_header(img, campaign, margin, header_h)

    panel_top = int(h * 0.47)
    panel_bottom = int(h * 0.76)
    rounded_panel(draw, (margin, panel_top, w - margin, panel_bottom), (12, 14, 18, 224), RED, 4, 18)
    inner_x = margin + int(w * 0.045)
    inner_w = w - margin * 2 - int(w * 0.09)
    heading_font = fitted_font(draw, campaign.headline, inner_w, int(w * 0.078), int(w * 0.048), True)
    y = panel_top + int(h * 0.040)
    y = draw_text(draw, (inner_x, y), campaign.headline, heading_font, YELLOW, inner_w, 6)
    sub_font = fitted_font(draw, campaign.subline, inner_w, int(w * 0.037), int(w * 0.027), False)
    draw_text(draw, (inner_x, y + int(h * 0.025)), campaign.subline, sub_font, WHITE, inner_w, 8)

    cta_h = int(h * 0.072)
    draw_cta(draw, (margin, int(h * 0.805), w - margin, int(h * 0.805) + cta_h), campaign.entry, int(w * 0.032))
    note_font = fitted_font(draw, campaign.note, w - margin * 2, int(w * 0.023), 18, False)
    draw_text(draw, (margin, int(h * 0.885)), campaign.note, note_font, MUTED, w - margin * 2, 5, stroke=1, stroke_fill=BLACK)
    draw_contact_footer(draw, size, margin, int(h * 0.935))
    return img.convert("RGB")


def story(size: tuple[int, int], campaign: Campaign) -> Image.Image:
    w, h = size
    x_bias = 0.58 if campaign.slug == "win-a-boiler" else 0.47
    img = base_canvas(size, campaign, x_bias, 0.50)
    draw = ImageDraw.Draw(img)
    margin = int(w * 0.07)
    header_h = int(h * 0.13)
    draw_header(img, campaign, margin, header_h)

    panel_top = int(h * 0.47)
    panel_bottom = int(h * 0.70)
    rounded_panel(draw, (margin, panel_top, w - margin, panel_bottom), (12, 14, 18, 230), RED, 4, 20)
    inner_x = margin + int(w * 0.055)
    inner_w = w - margin * 2 - int(w * 0.11)
    heading_font = fitted_font(draw, campaign.headline, inner_w, int(w * 0.086), int(w * 0.050), True)
    y = panel_top + int(h * 0.055)
    y = draw_text(draw, (inner_x, y), campaign.headline, heading_font, YELLOW, inner_w, 8)
    sub_font = fitted_font(draw, campaign.subline, inner_w, int(w * 0.040), int(w * 0.030), False)
    draw_text(draw, (inner_x, y + int(h * 0.028)), campaign.subline, sub_font, WHITE, inner_w, 8)

    draw_cta(draw, (margin, int(h * 0.75), w - margin, int(h * 0.81)), campaign.entry, int(w * 0.034))
    note_font = fitted_font(draw, campaign.note, w - margin * 2, int(w * 0.024), 18, False)
    draw_text(draw, (margin, int(h * 0.845)), campaign.note, note_font, MUTED, w - margin * 2, 5, stroke=1, stroke_fill=BLACK)
    draw_contact_footer(draw, size, margin, int(h * 0.925))
    return img.convert("RGB")


def landscape(size: tuple[int, int], campaign: Campaign) -> Image.Image:
    w, h = size
    x_bias = 0.52 if campaign.slug == "win-a-boiler" else 0.50
    img = base_canvas(size, campaign, x_bias, 0.50)
    draw = ImageDraw.Draw(img)
    margin = int(w * 0.035)
    header_h = int(h * 0.22)
    draw_header(img, campaign, margin, header_h)

    panel = (margin, int(h * 0.38), w - margin, int(h * 0.80))
    rounded_panel(draw, panel, (12, 14, 18, 228), RED, 4, 18)
    inner_x = panel[0] + int(w * 0.045)
    inner_w = panel[2] - panel[0] - int(w * 0.09)
    heading_start = int(w * (0.052 if len(campaign.headline) > 14 else 0.058))
    heading_font = fitted_font(draw, campaign.headline, inner_w, heading_start, int(w * 0.034), True)
    y = panel[1] + int(h * 0.07)
    y = draw_text(draw, (inner_x, y), campaign.headline, heading_font, YELLOW, inner_w, 4)
    sub_font = fitted_font(draw, campaign.subline, inner_w, int(w * 0.026), int(w * 0.020), False)
    y = draw_text(draw, (inner_x, y + int(h * 0.020)), campaign.subline, sub_font, WHITE, inner_w, 5)
    cta_top = min(panel[3] - int(h * 0.095), y + int(h * 0.026))
    draw_cta(draw, (inner_x, cta_top, inner_x + int(w * 0.54), cta_top + int(h * 0.075)), "Enter on Facebook & Instagram", int(w * 0.027))

    contact = f"{WEBSITE} | London {PHONE_LONDON} | Sussex {PHONE_MAIN} | 24/7 {PHONE_EMERGENCY}"
    contact_font = fitted_font(draw, contact, w - margin * 2, int(w * 0.021), 16, True)
    draw.text((margin, int(h * 0.86)), contact, font=contact_font, fill=WHITE, stroke_width=2, stroke_fill=BLACK)
    return img.convert("RGB")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    HIRES_OUT.mkdir(parents=True, exist_ok=True)
    specs = [
        (OUT, "instagram-square", (1080, 1080), square_or_portrait),
        (OUT, "instagram-portrait", (1080, 1350), square_or_portrait),
        (OUT, "instagram-story", (1080, 1920), story),
        (OUT, "facebook-landscape", (1200, 628), landscape),
        (HIRES_OUT, "instagram-square", (2160, 2160), square_or_portrait),
        (HIRES_OUT, "instagram-portrait", (2160, 2700), square_or_portrait),
        (HIRES_OUT, "instagram-story", (2160, 3840), story),
        (HIRES_OUT, "facebook-landscape", (2400, 1256), landscape),
    ]
    for campaign in CAMPAIGNS:
        for out_dir, name, size, renderer in specs:
            path = out_dir / f"geogas-{campaign.slug}-{name}.png"
            renderer(size, campaign).save(path, quality=95)
            print(path)


if __name__ == "__main__":
    main()
