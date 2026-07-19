from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "campaign" / "hero-bank"

LOGO = ROOT / "public" / "img" / "geologodark.png"
PHONE_LONDON = "0207 723 2221"
PHONE_MAIN = "01444 212 395"
PHONE_EMERGENCY = "07854 451 941"
WEBSITE = "www.geogasservices.uk"

SCENES = [
    {
        "slug": "boiler-prize-bearded-hero",
        "title": "WIN A BOILER",
        "subtitle": "A superhero prize campaign visual",
        "asset": ROOT / "campaign" / "generated-hero-art" / "win-a-boiler-hero-bearded.png",
        "kind": "generated",
    },
    {
        "slug": "yearly-cover-family-hero",
        "title": "WIN A YEAR'S COVER",
        "subtitle": "Peace of mind for the whole home",
        "asset": ROOT / "campaign" / "generated-hero-art" / "win-a-yearly-subscription-hero-bearded.png",
        "kind": "generated",
    },
    {
        "slug": "aaron-boiler-diagnostics",
        "title": "BOILER BREAKDOWN?",
        "subtitle": "Diagnostics heroes on call",
        "asset": ROOT / "public" / "cartoons" / "generated-action" / "aaron-fixing-boiler-diagnostics.png",
        "kind": "existing",
    },
    {
        "slug": "james-pressure-top-up",
        "title": "LOW PRESSURE?",
        "subtitle": "Heating heroes get things moving",
        "asset": ROOT / "public" / "cartoons" / "generated-action" / "james-fixing-pressure-top-up.png",
        "kind": "existing",
    },
    {
        "slug": "matthew-flue-safety",
        "title": "SAFETY FIRST",
        "subtitle": "Flue and boiler checks done properly",
        "asset": ROOT / "public" / "cartoons" / "generated-action" / "matthew-fixing-flue-safety-test.png",
        "kind": "existing",
    },
    {
        "slug": "mia-thermostat-calibration",
        "title": "CONTROL THE HEAT",
        "subtitle": "Thermostat and heating control heroes",
        "asset": ROOT / "public" / "cartoons" / "generated-action" / "mia-fixing-thermostat-calibration.png",
        "kind": "existing",
    },
    {
        "slug": "sophia-pump-replacement",
        "title": "HEATING STOPPED?",
        "subtitle": "Repair heroes for pumps and systems",
        "asset": ROOT / "public" / "cartoons" / "generated-action" / "sophia-fixing-pump-replacement.png",
        "kind": "existing",
    },
    {
        "slug": "geo-service-visit",
        "title": "SERVICE HEROES",
        "subtitle": "Annual boiler servicing and checks",
        "asset": ROOT / "public" / "cartoons" / "generated-action" / "geo-tech-fixing-service-visit.png",
        "kind": "existing",
    },
    {
        "slug": "gas-leak-comic-team",
        "title": "EMERGENCY TEAM",
        "subtitle": "Gas, plumbing and drainage support",
        "asset": ROOT / "public" / "cartoons" / "comics" / "comic-gas-leak-plumbing-hero-grid-yellow-bg.png",
        "kind": "comic",
    },
]


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    path = Path("C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf")
    if path.exists():
        return ImageFont.truetype(str(path), size)
    return ImageFont.load_default()


def text_bbox(draw: ImageDraw.ImageDraw, text: str, fnt: ImageFont.ImageFont) -> tuple[int, int, int, int]:
    return draw.textbbox((0, 0), text, font=fnt)


def fit_font(draw: ImageDraw.ImageDraw, text: str, max_width: int, start: int, minimum: int, bold: bool = False) -> ImageFont.ImageFont:
    size = start
    while size > minimum:
        fnt = font(size, bold)
        if text_bbox(draw, text, fnt)[2] <= max_width:
            return fnt
        size -= 2
    return font(minimum, bold)


def cover(path: Path, size: tuple[int, int], zoom: float = 1.0, x_bias: float = 0.5, y_bias: float = 0.5) -> Image.Image:
    img = Image.open(path).convert("RGB")
    sw, sh = size
    scale = max(sw / img.width, sh / img.height) * zoom
    nw, nh = int(img.width * scale), int(img.height * scale)
    img = img.resize((nw, nh), Image.Resampling.LANCZOS)
    left = int((nw - sw) * x_bias)
    top = int((nh - sh) * y_bias)
    return img.crop((left, top, left + sw, top + sh))


def draw_logo(img: Image.Image, box: tuple[int, int, int, int]) -> None:
    logo = Image.open(LOGO).convert("RGBA")
    x1, y1, x2, y2 = box
    pad = max(18, int((y2 - y1) * 0.12))
    max_w = x2 - x1 - pad * 2
    max_h = y2 - y1 - pad * 2
    scale = min(max_w / logo.width, max_h / logo.height)
    logo = logo.resize((int(logo.width * scale), int(logo.height * scale)), Image.Resampling.LANCZOS)
    img.alpha_composite(logo, (x1 + pad, y1 + (y2 - y1 - logo.height) // 2))


def draw_brand_band(img: Image.Image) -> None:
    draw = ImageDraw.Draw(img)
    w, h = img.size
    band_h = int(h * (0.24 if h < 800 else 0.185))
    draw.rectangle((0, 0, w, band_h), fill=(9, 10, 13, 248))
    draw.rectangle((0, band_h - max(8, h // 120), w, band_h), fill=(218, 22, 30, 255))
    logo_w = int(w * (0.48 if w <= 1080 else 0.42))
    draw_logo(img, (int(w * 0.035), int(h * 0.012), int(w * 0.035) + logo_w, band_h - int(h * 0.012)))

    if w > 900:
        phone_f = fit_font(draw, PHONE_LONDON, int(w * 0.31), max(42, w // 30), 26, True)
        web_f = fit_font(draw, WEBSITE, int(w * 0.31), max(28, w // 46), 20, False)
        right_x = int(w * 0.60)
        draw.text((right_x, int(band_h * 0.20)), "CALL", font=font(max(18, w // 78), True), fill=(255, 205, 44))
        draw.text((right_x, int(band_h * 0.40)), PHONE_LONDON, font=phone_f, fill=(255, 255, 255))
        draw.text((right_x, int(band_h * 0.71)), WEBSITE, font=web_f, fill=(255, 255, 255))


def draw_title_panel(img: Image.Image, title: str, subtitle: str) -> None:
    draw = ImageDraw.Draw(img)
    w, h = img.size
    x1 = int(w * 0.045)
    x2 = int(w * 0.955)
    y2 = int(h * 0.805)
    y1 = y2 - int(h * (0.22 if h < 800 else 0.205))
    draw.rounded_rectangle((x1, y1, x2, y2), radius=max(14, w // 70), fill=(9, 10, 13, 226), outline=(255, 205, 44), width=max(3, w // 260))
    panel_h = y2 - y1
    title_start = min(max(58, w // 13), int(panel_h * 0.43))
    title_font = fit_font(draw, title, x2 - x1 - int(w * 0.07), title_start, 32, True)
    sub_font = fit_font(draw, subtitle, x2 - x1 - int(w * 0.07), max(30, w // 30), 20, False)
    while title_font.size + sub_font.size + int(h * 0.06) > panel_h and title_font.size > 32:
        title_font = font(title_font.size - 2, True)
    tx = x1 + int(w * 0.035)
    ty = y1 + int(h * 0.033)
    draw.text((tx, ty), title, font=title_font, fill=(255, 205, 44))
    draw.text((tx, ty + int(title_font.size * 1.06)), subtitle, font=sub_font, fill=(255, 255, 255))


def draw_contact_strip(img: Image.Image) -> None:
    draw = ImageDraw.Draw(img)
    w, h = img.size
    strip_h = int(h * 0.13)
    y1 = h - strip_h
    draw.rectangle((0, y1, w, h), fill=(218, 22, 30, 248))
    draw.rectangle((0, y1, w, y1 + max(8, h // 110)), fill=(255, 205, 44, 255))

    contact = f"London {PHONE_LONDON}  |  Sussex {PHONE_MAIN}  |  24/7 {PHONE_EMERGENCY}"
    phone_f = fit_font(draw, contact, int(w * 0.92), max(36, w // 34), 20, True)
    web_f = fit_font(draw, WEBSITE, int(w * 0.88), max(30, w // 42), 20, True)
    pb = text_bbox(draw, contact, phone_f)
    wb = text_bbox(draw, WEBSITE, web_f)
    draw.text(((w - pb[2]) // 2, y1 + int(strip_h * 0.20)), contact, font=phone_f, fill=(255, 255, 255))
    draw.text(((w - wb[2]) // 2, y1 + int(strip_h * 0.58)), WEBSITE, font=web_f, fill=(9, 10, 13))


def render(scene: dict, size: tuple[int, int], suffix: str) -> Path:
    w, h = size
    asset = scene["asset"]
    bg = cover(asset, size, 1.02, 0.50, 0.50)
    bg = ImageEnhance.Color(bg).enhance(1.08)
    bg = ImageEnhance.Contrast(bg).enhance(1.04)
    img = bg.convert("RGBA")
    overlay = Image.new("RGBA", size, (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    od.rectangle((0, 0, w, int(h * 0.2)), fill=(0, 0, 0, 56))
    od.rectangle((0, int(h * 0.55), w, h), fill=(0, 0, 0, 76))
    img = Image.alpha_composite(img, overlay)
    draw_brand_band(img)
    draw_title_panel(img, scene["title"], scene["subtitle"])
    draw_contact_strip(img)
    out = OUT / f"geogas-{scene['slug']}-{suffix}-v2.png"
    img.convert("RGB").save(out, quality=95)
    return out


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    rows = ["Asset,Scenario,Source,Square,Portrait,Landscape"]
    for scene in SCENES:
        square = render(scene, (1080, 1080), "square")
        portrait = render(scene, (1080, 1350), "instagram-portrait")
        landscape = render(scene, (1200, 628), "landscape")
        rows.append(f"{scene['slug']},{scene['subtitle']},{scene['asset']},{square},{portrait},{landscape}")
        print(square)
        print(portrait)
        print(landscape)
    (OUT / "hero-bank-manifest-v2.csv").write_text("\n".join(rows), encoding="utf-8")


if __name__ == "__main__":
    main()
