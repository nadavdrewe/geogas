from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFont


ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "campaign" / "generated-hero-art" / "aaron-reference-style"
OUT = ROOT / "campaign" / "aaron-style-branded-ads"
LOGO = ROOT / "public" / "img" / "geologodark.png"

PHONE_MAIN = "01444 212 395"
PHONE_EMERGENCY = "07854 451 941"
WEBSITE = "www.geogasservices.uk"

SCENES = [
    {
        "slug": "boiler-repair",
        "asset": SRC / "boiler-repair-clean.png",
        "headline": "BOILER HEROES",
        "subhead": "Fast repairs. Safety checks. Peace of mind.",
        "tag": "GAS SUPERHEROES",
        "bias": {"landscape": (0.52, 0.48), "square": (0.58, 0.50), "portrait": (0.60, 0.50)},
    },
    {
        "slug": "family-cover",
        "asset": SRC / "family-cover-clean.png",
        "headline": "HOME COVER HEROES",
        "subhead": "24/7 peace of mind from \u00a319/month.",
        "tag": "GAS SUPERHEROES",
        "bias": {"landscape": (0.50, 0.50), "square": (0.42, 0.50), "portrait": (0.42, 0.50)},
    },
    {
        "slug": "emergency-callout",
        "asset": SRC / "emergency-callout-clean.png",
        "headline": "24/7 CALL-OUT HEROES",
        "subhead": "Heating, gas, plumbing and drainage support.",
        "tag": "EMERGENCY SUPPORT",
        "bias": {"landscape": (0.48, 0.50), "square": (0.40, 0.50), "portrait": (0.40, 0.50)},
    },
    {
        "slug": "plumbing-leak-rescue",
        "asset": SRC / "plumbing-leak-rescue-clean.png",
        "headline": "LEAK? WE'RE ON IT",
        "subhead": "Plumbing heroes for home emergencies.",
        "tag": "RAPID RESPONSE",
        "bias": {"landscape": (0.55, 0.50), "square": (0.62, 0.50), "portrait": (0.63, 0.50)},
    },
    {
        "slug": "carbon-monoxide-safety",
        "asset": SRC / "carbon-monoxide-safety-clean.png",
        "headline": "SAFETY CHECK HEROES",
        "subhead": "Boiler and CO alarm checks for peace of mind.",
        "tag": "HOME SAFETY",
        "bias": {"landscape": (0.50, 0.50), "square": (0.48, 0.50), "portrait": (0.48, 0.50)},
    },
    {
        "slug": "radiator-rescue",
        "asset": SRC / "radiator-rescue-clean.png",
        "headline": "RADIATOR RESCUE",
        "subhead": "Warm rooms, balanced systems, happy homes.",
        "tag": "HEATING SUPPORT",
        "bias": {"landscape": (0.48, 0.50), "square": (0.42, 0.50), "portrait": (0.42, 0.50)},
    },
    {
        "slug": "drainage-unblock",
        "asset": SRC / "drainage-unblock-clean.png",
        "headline": "DRAINAGE HEROES",
        "subhead": "Fast help when blocked drains strike.",
        "tag": "DRAINAGE SUPPORT",
        "bias": {"landscape": (0.50, 0.50), "square": (0.46, 0.50), "portrait": (0.46, 0.50)},
    },
    {
        "slug": "smart-thermostat-controls",
        "asset": SRC / "smart-thermostat-controls-clean.png",
        "headline": "CONTROL THE HEAT",
        "subhead": "Smart heating controls fitted properly.",
        "tag": "ENERGY SAVING",
        "bias": {"landscape": (0.44, 0.50), "square": (0.42, 0.50), "portrait": (0.42, 0.50)},
    },
]

SIZES = {
    "facebook-landscape": (1200, 628),
    "instagram-square": (1080, 1080),
    "instagram-portrait": (1080, 1350),
    "instagram-story": (1080, 1920),
}


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    path = Path("C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf")
    if path.exists():
        return ImageFont.truetype(str(path), size)
    return ImageFont.load_default()


def bbox(draw: ImageDraw.ImageDraw, text: str, fnt: ImageFont.ImageFont) -> tuple[int, int, int, int]:
    return draw.textbbox((0, 0), text, font=fnt)


def fit(draw: ImageDraw.ImageDraw, text: str, width: int, start: int, minimum: int, bold: bool) -> ImageFont.ImageFont:
    for size in range(start, minimum - 1, -2):
        fnt = font(size, bold)
        if bbox(draw, text, fnt)[2] <= width:
            return fnt
    return font(minimum, bold)


def cover(path: Path, size: tuple[int, int], x_bias: float, y_bias: float) -> Image.Image:
    img = Image.open(path).convert("RGB")
    w, h = size
    scale = max(w / img.width, h / img.height)
    img = img.resize((int(img.width * scale), int(img.height * scale)), Image.Resampling.LANCZOS)
    left = int(max(0, img.width - w) * x_bias)
    top = int(max(0, img.height - h) * y_bias)
    return img.crop((left, top, left + w, top + h))


def draw_logo(draw_img: Image.Image, x: int, y: int, max_w: int, max_h: int) -> None:
    logo = Image.open(LOGO).convert("RGBA")
    scale = min(max_w / logo.width, max_h / logo.height)
    logo = logo.resize((int(logo.width * scale), int(logo.height * scale)), Image.Resampling.LANCZOS)
    draw_img.alpha_composite(logo, (x, y + (max_h - logo.height) // 2))


def draw_header(img: Image.Image) -> None:
    draw = ImageDraw.Draw(img)
    w, h = img.size
    header_h = int(h * (0.18 if h < 1000 else 0.145))
    draw.rectangle((0, 0, w, header_h), fill=(7, 8, 11, 246))
    draw.rectangle((0, header_h - max(7, h // 145), w, header_h), fill=(221, 18, 28, 255))

    pad_x = int(w * 0.045)
    pad_y = int(header_h * 0.10)
    logo_w = int(w * (0.34 if w > 1100 else 0.48))
    draw_logo(img, pad_x, pad_y, logo_w, header_h - pad_y * 2)

    right_w = int(w * 0.43)
    call_f = fit(draw, "CALL NOW", right_w, max(22, w // 55), 16, True)
    phone_f = fit(draw, PHONE_MAIN, right_w, max(44, w // 27), 26, True)
    web_f = fit(draw, WEBSITE, right_w, max(28, w // 42), 18, False)
    x = w - pad_x - right_w
    draw.text((x, int(header_h * 0.16)), "CALL NOW", font=call_f, fill=(255, 205, 42))
    draw.text((x, int(header_h * 0.38)), PHONE_MAIN, font=phone_f, fill=(255, 255, 255))
    draw.text((x, int(header_h * 0.70)), WEBSITE, font=web_f, fill=(255, 255, 255))


def draw_title(img: Image.Image, scene: dict) -> None:
    draw = ImageDraw.Draw(img)
    w, h = img.size
    panel_w = int(w * (0.76 if w < 1150 else 0.64))
    panel_h = int(h * (0.205 if h < 800 else 0.18 if h < 1000 else 0.15))
    x = int(w * 0.045)
    y = int(h * (0.61 if h < 800 else 0.66 if h < 1000 else 0.68))
    radius = max(16, w // 70)

    draw.rounded_rectangle((x, y, x + panel_w, y + panel_h), radius=radius, fill=(7, 8, 11, 232), outline=(255, 205, 42), width=max(3, w // 280))
    draw.rectangle((x, y, x + max(11, w // 95), y + panel_h), fill=(221, 18, 28, 255))

    inner_x = x + int(w * 0.04)
    max_text_w = panel_w - int(w * 0.08)
    title_f = fit(draw, scene["headline"], max_text_w, min(max(54, w // 14), int(panel_h * 0.40)), 30, True)
    sub_f = fit(draw, scene["subhead"], max_text_w, min(max(29, w // 34), int(panel_h * 0.24)), 18, False)
    tag_f = fit(draw, scene["tag"], max_text_w, min(max(18, w // 58), int(panel_h * 0.17)), 14, True)

    draw.text((inner_x, y + int(panel_h * 0.12)), scene["tag"], font=tag_f, fill=(255, 205, 42))
    title_y = y + int(panel_h * 0.30)
    sub_y = min(y + int(panel_h * 0.74), title_y + int(title_f.size * 1.05))
    draw.text((inner_x, title_y), scene["headline"], font=title_f, fill=(255, 255, 255))
    draw.text((inner_x, sub_y), scene["subhead"], font=sub_f, fill=(255, 255, 255))


def draw_contact_strip(img: Image.Image) -> None:
    draw = ImageDraw.Draw(img)
    w, h = img.size
    strip_h = int(h * (0.135 if h < 800 else 0.095 if h < 1000 else 0.085))
    y = h - strip_h
    draw.rectangle((0, y, w, h), fill=(221, 18, 28, 252))
    draw.rectangle((0, y, w, y + max(7, h // 155)), fill=(255, 205, 42, 255))

    contact = f"{PHONE_MAIN}  |  {PHONE_EMERGENCY}"
    phone_f = fit(draw, contact, int(w * 0.90), min(max(40, w // 30), int(strip_h * 0.44)), 22, True)
    web_f = fit(draw, WEBSITE, int(w * 0.90), min(max(24, w // 50), int(strip_h * 0.24)), 16, True)
    pb = bbox(draw, contact, phone_f)
    wb = bbox(draw, WEBSITE, web_f)
    draw.text(((w - pb[2]) // 2, y + int(strip_h * 0.17)), contact, font=phone_f, fill=(255, 255, 255))
    draw.text(((w - wb[2]) // 2, y + int(strip_h * 0.64)), WEBSITE, font=web_f, fill=(7, 8, 11))


def render(scene: dict, size_name: str, size: tuple[int, int]) -> Path:
    bias_key = "landscape" if size[0] > size[1] else "portrait" if size[1] > size[0] else "square"
    x_bias, y_bias = scene["bias"][bias_key]
    bg = cover(scene["asset"], size, x_bias, y_bias)
    bg = ImageEnhance.Color(bg).enhance(1.05)
    bg = ImageEnhance.Contrast(bg).enhance(1.04)
    img = bg.convert("RGBA")

    shade = Image.new("RGBA", size, (0, 0, 0, 0))
    sd = ImageDraw.Draw(shade)
    w, h = size
    sd.rectangle((0, 0, w, int(h * 0.18)), fill=(0, 0, 0, 58))
    sd.rectangle((0, int(h * 0.58), w, h), fill=(0, 0, 0, 52))
    img = Image.alpha_composite(img, shade)

    draw_header(img)
    draw_title(img, scene)
    draw_contact_strip(img)

    OUT.mkdir(parents=True, exist_ok=True)
    out = OUT / f"geogas-{scene['slug']}-{size_name}.png"
    img.convert("RGB").save(out, quality=96)
    return out


def main() -> None:
    rows = ["scene,format,path"]
    for scene in SCENES:
        for size_name, size in SIZES.items():
            out = render(scene, size_name, size)
            rows.append(f"{scene['slug']},{size_name},{out}")
            print(out)
    (OUT / "manifest.csv").write_text("\n".join(rows), encoding="utf-8")


if __name__ == "__main__":
    main()
