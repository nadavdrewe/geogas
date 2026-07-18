from __future__ import annotations

import math
import shutil
import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "campaign" / "rendered"
FFMPEG = ROOT / "node_modules" / "@ffmpeg-installer" / "win32-x64" / "ffmpeg.exe"


ASSETS = {
    "van": ROOT / "public" / "cartoons" / "van1.jpeg",
    "comic": ROOT / "public" / "cartoons" / "comics" / "comic-gas-leak-plumbing-hero-grid-yellow-bg.png",
    "action": ROOT / "public" / "cartoons" / "generated-action" / "aaron-fixing-boiler-diagnostics.png",
    "service": ROOT / "public" / "cartoons" / "generated-action" / "geo-tech-fixing-service-visit.png",
    "logo_white": ROOT / "public" / "img" / "geologowhite.png",
    "logo_dark": ROOT / "public" / "img" / "geologodark.png",
}


RED = (220, 24, 31)
DEEP_RED = (145, 11, 17)
BLACK = (15, 17, 20)
WHITE = (255, 255, 255)
YELLOW = (255, 202, 40)
ORANGE = (255, 119, 0)


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    candidates = [
        Path("C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf"),
        Path("C:/Windows/Fonts/impact.ttf") if bold else Path("C:/Windows/Fonts/calibri.ttf"),
        Path("C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf"),
    ]
    for candidate in candidates:
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size)
    return ImageFont.load_default()


def cover(path: Path, size: tuple[int, int], zoom: float = 1.0, x_bias: float = 0.5, y_bias: float = 0.5) -> Image.Image:
    img = Image.open(path).convert("RGB")
    w, h = img.size
    sw, sh = size
    scale = max(sw / w, sh / h) * zoom
    nw, nh = int(w * scale), int(h * scale)
    img = img.resize((nw, nh), Image.Resampling.LANCZOS)
    left = int((nw - sw) * x_bias)
    top = int((nh - sh) * y_bias)
    return img.crop((left, top, left + sw, top + sh))


def add_overlay(img: Image.Image, alpha: int = 95) -> Image.Image:
    veil = Image.new("RGBA", img.size, (0, 0, 0, alpha))
    return Image.alpha_composite(img.convert("RGBA"), veil)


def wrap_text(draw: ImageDraw.ImageDraw, text: str, fnt: ImageFont.FreeTypeFont, max_width: int) -> list[str]:
    if "\n" in text:
        lines: list[str] = []
        for part in text.splitlines():
            lines.extend(wrap_text(draw, part, fnt, max_width))
        return lines
    words = text.split()
    lines: list[str] = []
    current = ""
    for word in words:
        test = f"{current} {word}".strip()
        if draw.textbbox((0, 0), test, font=fnt)[2] <= max_width:
            current = test
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def draw_text_block(
    img: Image.Image,
    xy: tuple[int, int],
    title: str,
    subtitle: str = "",
    max_width: int | None = None,
    title_size: int = 92,
    subtitle_size: int = 42,
    align: str = "left",
    title_fill: tuple[int, int, int] = WHITE,
    subtitle_fill: tuple[int, int, int] = WHITE,
) -> None:
    draw = ImageDraw.Draw(img)
    x, y = xy
    max_width = max_width or img.size[0] - x * 2
    title_font = font(title_size, True)
    sub_font = font(subtitle_size, False)
    for line in wrap_text(draw, title, title_font, max_width):
        bbox = draw.textbbox((0, 0), line, font=title_font, stroke_width=3)
        tx = x if align == "left" else x + (max_width - (bbox[2] - bbox[0])) // 2
        draw.text((tx, y), line, font=title_font, fill=title_fill, stroke_width=4, stroke_fill=BLACK)
        y += int(title_size * 1.02)
    if subtitle:
        y += int(subtitle_size * 0.25)
        for line in wrap_text(draw, subtitle, sub_font, max_width):
            bbox = draw.textbbox((0, 0), line, font=sub_font, stroke_width=2)
            tx = x if align == "left" else x + (max_width - (bbox[2] - bbox[0])) // 2
            draw.text((tx, y), line, font=sub_font, fill=subtitle_fill, stroke_width=2, stroke_fill=BLACK)
            y += int(subtitle_size * 1.18)


def draw_pill(draw: ImageDraw.ImageDraw, xy: tuple[int, int], text: str, fill: tuple[int, int, int], text_fill=WHITE, size=34) -> None:
    fnt = font(size, True)
    x, y = xy
    bbox = draw.textbbox((0, 0), text, font=fnt)
    pad_x, pad_y = 26, 13
    box = (x, y, x + bbox[2] + pad_x * 2, y + bbox[3] + pad_y * 2)
    draw.rounded_rectangle(box, radius=12, fill=fill)
    draw.text((x + pad_x, y + pad_y - 2), text, font=fnt, fill=text_fill)


def draw_bottom_bar(img: Image.Image, text: str) -> None:
    draw = ImageDraw.Draw(img)
    w, h = img.size
    bar_h = int(h * 0.105)
    draw.rectangle((0, h - bar_h, w, h), fill=(10, 10, 12))
    draw.rectangle((0, h - bar_h, w, h - bar_h + 8), fill=RED)
    fnt = font(max(24, int(w * 0.031)), True)
    bbox = draw.textbbox((0, 0), text, font=fnt)
    draw.text(((w - (bbox[2] - bbox[0])) // 2, h - bar_h + (bar_h - (bbox[3] - bbox[1])) // 2 - 2), text, font=fnt, fill=WHITE)


def draw_logo(img: Image.Image, size: int, pos: tuple[int, int]) -> None:
    logo = Image.open(ASSETS["logo_dark"]).convert("RGBA")
    ratio = size / logo.width
    logo = logo.resize((size, int(logo.height * ratio)), Image.Resampling.LANCZOS)
    draw = ImageDraw.Draw(img)
    pad = max(16, size // 18)
    box = (pos[0] - pad, pos[1] - pad, pos[0] + logo.width + pad, pos[1] + logo.height + pad)
    draw.rounded_rectangle(box, radius=max(10, pad // 2), fill=WHITE)
    img.alpha_composite(logo, pos)


def art_panel(path: Path, size: tuple[int, int], zoom: float, y: float = 0.48) -> Image.Image:
    w, h = size
    bg = cover(path, size, 1.18 + zoom * 0.03, 0.5, 0.5).filter(ImageFilter.GaussianBlur(max(10, w // 80)))
    bg = ImageEnhance.Brightness(bg).enhance(0.58).convert("RGBA")
    art = Image.open(path).convert("RGB")
    max_w = int(w * 0.92)
    max_h = int(h * 0.62)
    scale = min(max_w / art.width, max_h / art.height) * (1.0 + zoom * 0.015)
    art = art.resize((int(art.width * scale), int(art.height * scale)), Image.Resampling.LANCZOS).convert("RGBA")
    x = (w - art.width) // 2
    yy = int(h * y - art.height / 2)
    shadow = Image.new("RGBA", size, (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    sd.rounded_rectangle((x - 18, yy - 18, x + art.width + 18, yy + art.height + 18), radius=20, fill=(0, 0, 0, 95))
    shadow = shadow.filter(ImageFilter.GaussianBlur(16))
    img = Image.alpha_composite(bg, shadow)
    img.alpha_composite(art, (x, yy))
    return img


def make_frame(size: tuple[int, int], t: float, duration: float) -> Image.Image:
    w, h = size
    scene = min(4, int(t // 3))
    local = (t % 3) / 3
    ease = 0.5 - math.cos(local * math.pi) / 2

    if scene == 0:
        bg = cover(ASSETS["van"], size, 1.08 + ease * 0.05, 0.54, 0.52)
        img = add_overlay(bg, 55)
        burst = Image.new("RGBA", size, (0, 0, 0, 0))
        d = ImageDraw.Draw(burst)
        for i in range(18):
            angle = i * math.pi / 9 + ease * 0.18
            x2 = w * 0.72 + math.cos(angle) * w * 0.55
            y2 = h * 0.22 + math.sin(angle) * h * 0.55
            d.line((w * 0.72, h * 0.22, x2, y2), fill=(255, 153, 0, 48), width=max(8, w // 80))
        img = Image.alpha_composite(img, burst)
        draw = ImageDraw.Draw(img)
        draw_pill(draw, (int(w * 0.07), int(h * 0.08)), "GEO GAS SERVICES", RED, size=max(28, int(w * 0.035)))
        draw_text_block(img, (int(w * 0.07), int(h * 0.20)), "GAS SUPERHEROES", "Your home emergency heroes, on call 24/7.", int(w * 0.78), int(w * 0.082), int(w * 0.039))
        draw_bottom_bar(img, "Heating | Plumbing | Gas | Drainage")
    elif scene == 1:
        bg = cover(ASSETS["comic"], size, 1.03 + ease * 0.04, 0.46, 0.44)
        img = add_overlay(bg, 80)
        draw = ImageDraw.Draw(img)
        draw_pill(draw, (int(w * 0.07), int(h * 0.08)), "WHEN TROUBLE STRIKES", YELLOW, BLACK, size=max(26, int(w * 0.031)))
        draw_text_block(img, (int(w * 0.07), int(h * 0.18)), "BOILER PANIC?", "Leaks, pressure drops, no heat, no hot water.", int(w * 0.80), int(w * 0.083), int(w * 0.038), title_fill=YELLOW)
        draw_bottom_bar(img, "Real problems. Qualified engineers.")
    elif scene == 2:
        img = art_panel(ASSETS["action"], size, ease, 0.52)
        draw = ImageDraw.Draw(img)
        draw_pill(draw, (int(w * 0.07), int(h * 0.08)), "PEACE OF MIND", RED, size=max(28, int(w * 0.035)))
        draw_text_block(img, (int(w * 0.07), int(h * 0.19)), "24/7 HELPLINE", "Gas Safe registered support when your home needs help.", int(w * 0.80), int(w * 0.084), int(w * 0.038))
        draw_bottom_bar(img, "24hr response target")
    elif scene == 3:
        img = art_panel(ASSETS["service"], size, ease, 0.53)
        draw = ImageDraw.Draw(img)
        draw_pill(draw, (int(w * 0.07), int(h * 0.08)), "HOME SERVICE CONTRACTS", BLACK, size=max(25, int(w * 0.029)))
        draw_text_block(img, (int(w * 0.07), int(h * 0.18)), f"FROM {chr(163)}19/MONTH", "Annual boiler service, cover options and local support.", int(w * 0.82), int(w * 0.081), int(w * 0.036), title_fill=YELLOW)
        draw_bottom_bar(img, "Avoid the next surprise breakdown")
    else:
        img = Image.new("RGBA", size, DEEP_RED)
        draw = ImageDraw.Draw(img)
        for i in range(12):
            x0 = int((i / 12) * w - w * 0.2 + ease * w * 0.12)
            draw.polygon([(x0, 0), (x0 + int(w * 0.16), 0), (x0 - int(w * 0.18), h), (x0 - int(w * 0.34), h)], fill=(196, 16, 22))
        draw_logo(img, int(w * 0.38), (int(w * 0.08), int(h * 0.10)))
        draw_text_block(img, (int(w * 0.08), int(h * 0.31)), "CALL THE EVERYDAY HEROES", f"01444 212395\n07854 451941\ngeogasservices.co.uk", int(w * 0.84), int(w * 0.07), int(w * 0.038))
        draw_pill(draw, (int(w * 0.08), int(h * 0.76)), "MESSAGE GEO GAS TODAY", BLACK, size=max(28, int(w * 0.034)))

    return img.convert("RGB")


def render(name: str, size: tuple[int, int], fps: int = 30, duration: int = 15) -> Path:
    frames = OUT / f"frames_{name}"
    if frames.exists():
        shutil.rmtree(frames)
    frames.mkdir(parents=True, exist_ok=True)
    total = fps * duration
    for i in range(total):
        frame = make_frame(size, i / fps, duration)
        frame.save(frames / f"frame_{i:04d}.jpg", quality=92, optimize=True)
    output = OUT / f"geogas-gas-superheroes-{name}.mp4"
    cmd = [
        str(FFMPEG),
        "-y",
        "-framerate",
        str(fps),
        "-i",
        str(frames / "frame_%04d.jpg"),
        "-c:v",
        "libx264",
        "-pix_fmt",
        "yuv420p",
        "-movflags",
        "+faststart",
        "-r",
        str(fps),
        str(output),
    ]
    subprocess.run(cmd, check=True)
    make_frame(size, 1.2, duration).save(OUT / f"geogas-gas-superheroes-{name}-thumbnail.jpg", quality=95)
    return output


def main() -> None:
    if not FFMPEG.exists():
        raise FileNotFoundError(f"Missing ffmpeg encoder: {FFMPEG}")
    OUT.mkdir(parents=True, exist_ok=True)
    outputs = [
        render("instagram-vertical-1080x1920", (1080, 1920)),
        render("social-square-1080x1080", (1080, 1080)),
        render("facebook-landscape-1200x628", (1200, 628)),
    ]
    for output in outputs:
        print(output)


if __name__ == "__main__":
    main()
