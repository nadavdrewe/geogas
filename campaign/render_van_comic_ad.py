from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "campaign" / "social-promos"

VAN = ROOT / "public" / "cartoons" / "van1.jpeg"
AARON = ROOT / "campaign" / "source-art" / "aaron-boiler-hero.png"
LOGO = ROOT / "public" / "img" / "geologowhite.png"

WEBSITE = "www.geogasservices.uk"
PHONE_LONDON = "0207 723 2221"
PHONE_SUSSEX = "01444 212 395"
PHONE_247 = "07854 451 941"

RED = (218, 22, 30)
RED_DARK = (120, 8, 14)
BLACK = (9, 10, 13)
CHARCOAL = (20, 22, 28)
WHITE = (255, 255, 255)
YELLOW = (255, 205, 44)
MUTED = (230, 233, 238)


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


def cover(path: Path, size: tuple[int, int], x_bias: float = 0.5, y_bias: float = 0.5, zoom: float = 1.0) -> Image.Image:
    img = Image.open(path).convert("RGB")
    sw, sh = size
    scale = max(sw / img.width, sh / img.height) * zoom
    nw, nh = int(img.width * scale), int(img.height * scale)
    img = img.resize((nw, nh), Image.Resampling.LANCZOS)
    left = int((nw - sw) * x_bias)
    top = int((nh - sh) * y_bias)
    return img.crop((left, top, left + sw, top + sh))


def contain(path: Path, box_size: tuple[int, int]) -> Image.Image:
    img = Image.open(path).convert("RGBA")
    img.thumbnail(box_size, Image.Resampling.LANCZOS)
    return img


def draw_text_block(
    draw: ImageDraw.ImageDraw,
    x: int,
    y: int,
    text: str,
    fnt: ImageFont.FreeTypeFont,
    fill,
    max_width: int,
    gap: int = 10,
    stroke: int = 0,
) -> int:
    for line in wrap(draw, text, fnt, max_width):
        draw.text((x, y), line, font=fnt, fill=fill, stroke_width=stroke, stroke_fill=BLACK)
        box = draw.textbbox((x, y), line, font=fnt, stroke_width=stroke)
        y = box[3] + gap
    return y


def draw_logo(img: Image.Image, box: tuple[int, int, int, int]) -> None:
    logo = Image.open(LOGO).convert("RGBA")
    x1, y1, x2, y2 = box
    scale = min((x2 - x1) / logo.width, (y2 - y1) / logo.height)
    logo = logo.resize((int(logo.width * scale), int(logo.height * scale)), Image.Resampling.LANCZOS)
    img.alpha_composite(logo, (x1, y1 + (y2 - y1 - logo.height) // 2))


def draw_speed_lines(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int]) -> None:
    x1, y1, x2, y2 = box
    for i in range(22):
        y = y1 + int((y2 - y1) * i / 21)
        length = 110 + (i % 5) * 55
        draw.line((x1 + 20, y, x1 + length, y - 34), fill=(RED[0], RED[1], RED[2], 130), width=5)
        draw.line((x2 - 20, y, x2 - length, y + 34), fill=(RED[0], RED[1], RED[2], 115), width=4)


def draw_cherry_picker(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int]) -> None:
    x1, y1, x2, y2 = box
    base_y = y2 - 64
    draw.rectangle((x1 + 90, base_y - 40, x1 + 380, base_y), fill=(42, 44, 50), outline=BLACK, width=5)
    draw.ellipse((x1 + 120, base_y - 10, x1 + 190, base_y + 60), fill=BLACK)
    draw.ellipse((x1 + 290, base_y - 10, x1 + 360, base_y + 60), fill=BLACK)
    pivot = (x1 + 260, base_y - 45)
    bucket = (x2 - 330, y1 + 88, x2 - 130, y1 + 188)
    draw.line((pivot[0], pivot[1], bucket[0] + 40, bucket[3]), fill=YELLOW, width=24)
    draw.line((pivot[0] + 26, pivot[1], bucket[0] + 74, bucket[3]), fill=RED, width=12)
    draw.rounded_rectangle(bucket, radius=18, fill=(235, 236, 240), outline=BLACK, width=7)
    draw.line((bucket[0] + 20, bucket[1] + 50, bucket[2] - 20, bucket[1] + 50), fill=BLACK, width=5)
    for angle in range(0, 360, 35):
        cx, cy = pivot
        ex = cx + int(math.cos(math.radians(angle)) * 58)
        ey = cy + int(math.sin(math.radians(angle)) * 58)
        draw.line((cx, cy, ex, ey), fill=RED, width=5)
    draw.ellipse((pivot[0] - 24, pivot[1] - 24, pivot[0] + 24, pivot[1] + 24), fill=YELLOW, outline=BLACK, width=5)


def draw_panel_label(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], label: str) -> None:
    x1, y1, _, _ = box
    fnt = font(34, True)
    draw.rounded_rectangle((x1 + 28, y1 + 28, x1 + 118, y1 + 88), radius=12, fill=RED, outline=YELLOW, width=4)
    draw.text((x1 + 50, y1 + 38), label, font=fnt, fill=WHITE)


def add_panel_frame(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int]) -> None:
    draw.rounded_rectangle(box, radius=18, outline=BLACK, width=16)
    draw.rounded_rectangle(box, radius=18, outline=YELLOW, width=5)


def render() -> Path:
    size = (2160, 2160)
    w, h = size
    img = Image.new("RGBA", size, CHARCOAL + (255,))
    draw = ImageDraw.Draw(img)

    # Comic-book red burst background.
    for r in range(0, 1600, 90):
        alpha = max(18, 120 - r // 10)
        draw.ellipse((w // 2 - r, h // 2 - r, w // 2 + r, h // 2 + r), outline=(RED[0], RED[1], RED[2], alpha), width=18)
    draw_speed_lines(draw, (0, 0, w, h))

    header_h = 230
    draw.rectangle((0, 0, w, header_h), fill=BLACK)
    draw.rectangle((0, header_h - 18, w, header_h), fill=RED)
    draw_logo(img, (70, 42, 520, 170))
    top_f = fit_font(draw, "CARTOON CALLOUT ADVERT", 650, 54, 32, True)
    draw.text((610, 54), "CARTOON CALLOUT ADVERT", font=top_f, fill=YELLOW)
    draw.text((610, 118), "From boiler breakdown to superhero repair", font=font(38), fill=WHITE)
    draw.text((w - 555, 64), "24/7 PEACE OF MIND", font=font(42, True), fill=WHITE)
    draw.text((w - 555, 122), "Competitive monthly rates", font=font(32), fill=MUTED)

    margin = 70
    gap = 38
    panel_w = (w - margin * 2 - gap * 2) // 3
    panel_top = 285
    panel_h = 1160
    panels = []
    for i in range(3):
        x1 = margin + i * (panel_w + gap)
        panels.append((x1, panel_top, x1 + panel_w, panel_top + panel_h))

    # Panel 1: meeting-note scenario.
    p1 = panels[0]
    draw.rounded_rectangle(p1, radius=18, fill=(242, 243, 246))
    draw_cherry_picker(draw, p1)
    draw_panel_label(draw, p1, "1")
    t1 = fit_font(draw, "CHERRY PICKER STUCK?", panel_w - 86, 76, 42, True)
    y = p1[1] + 660
    y = draw_text_block(draw, p1[0] + 42, y, "CHERRY PICKER STUCK?", t1, RED, panel_w - 84, 8)
    draw_text_block(draw, p1[0] + 42, y + 16, "Real job problem. No panic.", font(40, True), BLACK, panel_w - 84, 8)

    # Panel 2: superhero transformation.
    p2 = panels[1]
    aaron = cover(AARON, (panel_w, panel_h), 0.66, 0.48, 1.04).convert("RGBA")
    aaron = ImageEnhance.Color(aaron).enhance(1.12)
    img.alpha_composite(aaron, (p2[0], p2[1]))
    shade = Image.new("RGBA", (panel_w, panel_h), (0, 0, 0, 80))
    img.alpha_composite(shade, (p2[0], p2[1]))
    draw_panel_label(draw, p2, "2")
    t2 = fit_font(draw, "ENGINEER MODE: SUPERHERO", panel_w - 86, 68, 38, True)
    y = p2[1] + 690
    y = draw_text_block(draw, p2[0] + 42, y, "ENGINEER MODE:", t2, YELLOW, panel_w - 84, 8, 2)
    draw_text_block(draw, p2[0] + 42, y, "SUPERHERO", fit_font(draw, "SUPERHERO", panel_w - 84, 86, 48, True), WHITE, panel_w - 84, 8, 2)

    # Panel 3: van and save-the-day brand anchor.
    p3 = panels[2]
    draw.rounded_rectangle(p3, radius=18, fill=WHITE)
    van = contain(VAN, (panel_w - 70, 610))
    van_y = p3[1] + 205
    img.alpha_composite(van, (p3[0] + (panel_w - van.width) // 2, van_y))
    draw_panel_label(draw, p3, "3")
    t3 = fit_font(draw, "JOB SAVED.", panel_w - 86, 88, 48, True)
    y = p3[1] + 735
    y = draw_text_block(draw, p3[0] + 42, y, "JOB SAVED.", t3, RED, panel_w - 84, 8)
    draw_text_block(draw, p3[0] + 42, y + 10, "Boiler repaired. Cover sorted.", font(42, True), BLACK, panel_w - 84, 8)

    for panel in panels:
        add_panel_frame(draw, panel)

    banner = (margin, 1510, w - margin, 1845)
    draw.rounded_rectangle(banner, radius=26, fill=(BLACK[0], BLACK[1], BLACK[2], 238), outline=YELLOW, width=6)
    h_f = fit_font(draw, "BOILER REPAIRS. SUPERHERO COVER.", banner[2] - banner[0] - 110, 92, 50, True)
    y = banner[1] + 50
    y = draw_text_block(draw, banner[0] + 55, y, "BOILER REPAIRS. SUPERHERO COVER.", h_f, YELLOW, banner[2] - banner[0] - 110, 8, 2)
    sub_f = fit_font(draw, "24/7 boiler help, flexible monthly cover and local engineers across London & Sussex.", banner[2] - banner[0] - 110, 46, 30, False)
    draw_text_block(draw, banner[0] + 55, y + 18, "24/7 boiler help, flexible monthly cover and local engineers across London & Sussex.", sub_f, WHITE, banner[2] - banner[0] - 110, 8)

    footer_h = 210
    fy = h - footer_h
    draw.rectangle((0, fy, w, h), fill=RED)
    draw.rectangle((0, fy, w, fy + 16), fill=YELLOW)
    contact_top = WEBSITE
    contact_bottom = f"London {PHONE_LONDON}  |  Sussex {PHONE_SUSSEX}  |  24/7 {PHONE_247}"
    c1_f = fit_font(draw, contact_top, w - 150, 46, 30, True)
    c2_f = fit_font(draw, contact_bottom, w - 150, 40, 26, True)
    for text, fnt, y_off, fill in [
        (contact_top, c1_f, 36, WHITE),
        (contact_bottom, c2_f, 92, WHITE),
        ("Facebook + Instagram comic strip campaign concept", font(32, True), 150, BLACK),
    ]:
        box = draw.textbbox((0, 0), text, font=fnt)
        draw.text(((w - (box[2] - box[0])) // 2, fy + y_off), text, font=fnt, fill=fill)

    out = OUT / "geogas-van-comic-meeting-notes-instagram-square.png"
    OUT.mkdir(parents=True, exist_ok=True)
    img.convert("RGB").save(out, quality=96)
    return out


if __name__ == "__main__":
    print(render())
