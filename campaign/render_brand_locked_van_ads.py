from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "campaign" / "brand-locked-van-ads"

ASSETS = {
    "van": ROOT / "public" / "cartoons" / "van1.jpeg",
    "logo_white": ROOT / "public" / "img" / "geologowhite.png",
}

WEBSITE = "www.geogasservices.uk"
QR_URL = "https://www.geogasservices.uk"
PHONE_LONDON = "0207 723 2221"
PHONE_SUSSEX = "01444 212 395"
PHONE_EMERGENCY = "07854 451 941"

RED = (221, 18, 28)
RED_DARK = (94, 5, 10)
BLACK = (8, 10, 14)
CHARCOAL = (20, 23, 29)
WHITE = (255, 255, 255)
YELLOW = (255, 205, 54)
MUTED = (226, 229, 235)


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    paths = [
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
        "C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf",
    ]
    for path in paths:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def text_w(draw: ImageDraw.ImageDraw, text: str, fnt: ImageFont.FreeTypeFont) -> int:
    box = draw.textbbox((0, 0), text, font=fnt)
    return box[2] - box[0]


def fitted(draw: ImageDraw.ImageDraw, text: str, max_w: int, start: int, minimum: int, bold: bool = True) -> ImageFont.FreeTypeFont:
    size = start
    while size >= minimum:
        fnt = font(size, bold)
        if text_w(draw, text, fnt) <= max_w:
            return fnt
        size -= 2
    return font(minimum, bold)


def round_rect(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], fill, outline=None, width: int = 2, radius: int = 18) -> None:
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def make_bg(size: tuple[int, int]) -> Image.Image:
    w, h = size
    img = Image.new("RGB", size, BLACK)
    pix = img.load()
    for y in range(h):
        yy = y / max(1, h - 1)
        for x in range(w):
            xx = x / max(1, w - 1)
            red_glow = max(0, 1 - ((xx - 0.18) ** 2 / 0.18 + (yy - 0.10) ** 2 / 0.12))
            heat = max(0, 1 - ((xx - 0.90) ** 2 / 0.12 + (yy - 0.85) ** 2 / 0.20))
            r = int(10 + 55 * yy + 118 * red_glow + 65 * heat)
            g = int(11 + 10 * yy + 10 * red_glow)
            b = int(15 + 14 * yy + 8 * heat)
            pix[x, y] = (min(255, r), min(255, g), min(255, b))
    draw = ImageDraw.Draw(img, "RGBA")
    step = max(72, w // 18)
    for i in range(-4, 26):
        x0 = i * step
        draw.line((x0, h, x0 + int(w * 0.58), 0), fill=(255, 255, 255, 18), width=max(1, w // 360))
    for i in range(11):
        y = int(h * (0.08 + i * 0.085))
        draw.line((0, y, w, y + int(h * 0.06)), fill=(230, 20, 30, 22), width=max(1, h // 180))
    return img


def paste_logo(img: Image.Image, box: tuple[int, int, int, int]) -> None:
    logo = Image.open(ASSETS["logo_white"]).convert("RGBA")
    x1, y1, x2, y2 = box
    scale = min((x2 - x1) / logo.width, (y2 - y1) / logo.height)
    logo = logo.resize((int(logo.width * scale), int(logo.height * scale)), Image.Resampling.LANCZOS)
    img.alpha_composite(logo, (x1, y1 + (y2 - y1 - logo.height) // 2))


def paste_van(img: Image.Image, box: tuple[int, int, int, int]) -> None:
    """Place the locked van artwork without recolouring, redrawing, or changing the livery."""
    van = Image.open(ASSETS["van"]).convert("RGB")
    x1, y1, x2, y2 = box
    max_w, max_h = x2 - x1, y2 - y1
    scale = min(max_w / van.width, max_h / van.height)
    vw, vh = int(van.width * scale), int(van.height * scale)
    van = van.resize((vw, vh), Image.Resampling.LANCZOS)

    shadow = Image.new("RGBA", img.size, (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow, "RGBA")
    sx = x1 + (max_w - vw) // 2
    sy = y1 + (max_h - vh) // 2
    sd.rounded_rectangle((sx + 32, sy + 40, sx + vw + 32, sy + vh + 40), radius=32, fill=(0, 0, 0, 125))
    shadow = shadow.filter(ImageFilter.GaussianBlur(28))
    img.alpha_composite(shadow)

    matte = Image.new("RGBA", (vw + 48, vh + 48), WHITE)
    md = ImageDraw.Draw(matte, "RGBA")
    md.rounded_rectangle((0, 0, vw + 47, vh + 47), radius=26, outline=(255, 255, 255, 220), width=10)
    matte.alpha_composite(van.convert("RGBA"), (24, 24))
    img.alpha_composite(matte, (sx - 24, sy - 24))


def draw_contacts(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], center: bool = False) -> None:
    x1, y1, x2, y2 = box
    lines = [
        WEBSITE,
        f"London {PHONE_LONDON}   Sussex {PHONE_SUSSEX}",
        f"24/7 Emergency {PHONE_EMERGENCY}",
    ]
    f1 = fitted(draw, lines[0], x2 - x1, max(32, (y2 - y1) // 4), 22, True)
    f2 = fitted(draw, lines[1], x2 - x1, max(24, (y2 - y1) // 6), 16, True)
    f3 = fitted(draw, lines[2], x2 - x1, max(24, (y2 - y1) // 6), 16, True)
    y = y1
    for text, fnt, fill in [(lines[0], f1, WHITE), (lines[1], f2, MUTED), (lines[2], f3, YELLOW)]:
        tw = text_w(draw, text, fnt)
        x = x1 + ((x2 - x1 - tw) // 2 if center else 0)
        draw.text((x, y), text, font=fnt, fill=fill, stroke_width=2, stroke_fill=BLACK)
        y += int(fnt.size * 1.18)


def gf_mul(x: int, y: int) -> int:
    z = 0
    while y:
        if y & 1:
            z ^= x
        x <<= 1
        if x & 0x100:
            x ^= 0x11D
        y >>= 1
    return z


def rs_generator(degree: int) -> list[int]:
    poly = [1]
    root = 1
    for _ in range(degree):
        poly = [gf_mul(c, root) for c in poly] + [0]
        for j in range(len(poly) - 1):
            poly[j + 1] ^= poly[j]
        root = gf_mul(root, 2)
    return poly


def rs_remainder(data: list[int], degree: int) -> list[int]:
    gen = rs_generator(degree)
    rem = [0] * degree
    for b in data:
        factor = b ^ rem.pop(0)
        rem.append(0)
        for i in range(degree):
            rem[i] ^= gf_mul(gen[i + 1], factor)
    return rem


def append_bits(bits: list[int], value: int, count: int) -> None:
    for i in range(count - 1, -1, -1):
        bits.append((value >> i) & 1)


def qr_matrix(data: str) -> list[list[bool]]:
    version = 3
    size = 21 + 4 * (version - 1)
    data_codewords = 55
    ec_codewords = 15
    raw = data.encode("iso-8859-1")
    bits: list[int] = []
    append_bits(bits, 0b0100, 4)
    append_bits(bits, len(raw), 8)
    for b in raw:
        append_bits(bits, b, 8)
    append_bits(bits, 0, min(4, data_codewords * 8 - len(bits)))
    while len(bits) % 8:
        bits.append(0)
    pad = [0xEC, 0x11]
    data_bytes = [sum(bits[i + j] << (7 - j) for j in range(8)) for i in range(0, len(bits), 8)]
    k = 0
    while len(data_bytes) < data_codewords:
        data_bytes.append(pad[k % 2])
        k += 1
    all_bytes = data_bytes + rs_remainder(data_bytes, ec_codewords)
    stream: list[int] = []
    for b in all_bytes:
        append_bits(stream, b, 8)

    mat: list[list[bool | None]] = [[None] * size for _ in range(size)]
    reserved = [[False] * size for _ in range(size)]

    def set_mod(x: int, y: int, val: bool, reserve: bool = True) -> None:
        if 0 <= x < size and 0 <= y < size:
            mat[y][x] = val
            if reserve:
                reserved[y][x] = True

    def finder(x: int, y: int) -> None:
        for dy in range(-1, 8):
            for dx in range(-1, 8):
                xx, yy = x + dx, y + dy
                if not (0 <= xx < size and 0 <= yy < size):
                    continue
                if 0 <= dx <= 6 and 0 <= dy <= 6:
                    val = dx in (0, 6) or dy in (0, 6) or (2 <= dx <= 4 and 2 <= dy <= 4)
                else:
                    val = False
                set_mod(xx, yy, val)

    finder(0, 0)
    finder(size - 7, 0)
    finder(0, size - 7)
    for i in range(8, size - 8):
        set_mod(i, 6, i % 2 == 0)
        set_mod(6, i, i % 2 == 0)
    for cy, cx in [(22, 22)]:
        for dy in range(-2, 3):
            for dx in range(-2, 3):
                set_mod(cx + dx, cy + dy, max(abs(dx), abs(dy)) in (0, 2))
    set_mod(8, 4 * version + 9, True)
    for i in range(9):
        if i != 6:
            reserved[8][i] = True
            reserved[i][8] = True
    for i in range(8):
        reserved[8][size - 1 - i] = True
        reserved[size - 1 - i][8] = True

    i = 0
    direction = -1
    x = size - 1
    y = size - 1
    while x > 0:
        if x == 6:
            x -= 1
        while 0 <= y < size:
            for xx in [x, x - 1]:
                if not reserved[y][xx]:
                    bit = stream[i] if i < len(stream) else 0
                    mask = (xx + y) % 2 == 0
                    mat[y][xx] = bool(bit) ^ mask
                    i += 1
            y += direction
        y -= direction
        direction *= -1
        x -= 2

    fmt = (0b01 << 3) | 0
    rem = fmt << 10
    for j in range(14, 9, -1):
        if (rem >> j) & 1:
            rem ^= 0x537 << (j - 10)
    fmt_bits = ((fmt << 10) | rem) ^ 0x5412
    coords1 = [(8, 0), (8, 1), (8, 2), (8, 3), (8, 4), (8, 5), (8, 7), (8, 8), (7, 8), (5, 8), (4, 8), (3, 8), (2, 8), (1, 8), (0, 8)]
    coords2 = [(size - 1, 8), (size - 2, 8), (size - 3, 8), (size - 4, 8), (size - 5, 8), (size - 6, 8), (size - 7, 8), (8, size - 8), (8, size - 7), (8, size - 6), (8, size - 5), (8, size - 4), (8, size - 3), (8, size - 2), (8, size - 1)]
    for n, (x, y) in enumerate(coords1):
        mat[y][x] = bool((fmt_bits >> n) & 1)
    for n, (x, y) in enumerate(coords2):
        mat[y][x] = bool((fmt_bits >> n) & 1)
    return [[bool(v) for v in row] for row in mat]


def make_qr(data: str, pixels: int) -> Image.Image:
    matrix = qr_matrix(data)
    modules = len(matrix)
    quiet = 4
    cell = max(1, pixels // (modules + quiet * 2))
    out = Image.new("RGB", ((modules + quiet * 2) * cell, (modules + quiet * 2) * cell), WHITE)
    draw = ImageDraw.Draw(out)
    for y, row in enumerate(matrix):
        for x, val in enumerate(row):
            if val:
                x1 = (x + quiet) * cell
                y1 = (y + quiet) * cell
                draw.rectangle((x1, y1, x1 + cell - 1, y1 + cell - 1), fill=BLACK)
    return out.resize((pixels, pixels), Image.Resampling.NEAREST)


def draw_qr_panel(img: Image.Image, box: tuple[int, int, int, int], label: str) -> None:
    draw = ImageDraw.Draw(img, "RGBA")
    round_rect(draw, box, (255, 255, 255, 246), RED, 5, 18)
    x1, y1, x2, y2 = box
    qr_size = min(x2 - x1 - 44, y2 - y1 - 100)
    qr = make_qr(QR_URL, qr_size).convert("RGBA")
    img.alpha_composite(qr, (x1 + (x2 - x1 - qr_size) // 2, y1 + 24))
    fnt = fitted(ImageDraw.Draw(img), label, x2 - x1 - 32, 34, 18, True)
    tw = text_w(ImageDraw.Draw(img), label, fnt)
    ImageDraw.Draw(img).text((x1 + (x2 - x1 - tw) // 2, y2 - 56), label, font=fnt, fill=BLACK)


def social_square(headline: str, subline: str, cta: str, note: str, filename: str) -> Path:
    size = (2160, 2160)
    img = make_bg(size).convert("RGBA")
    draw = ImageDraw.Draw(img, "RGBA")
    w, h = size
    m = 126

    paste_logo(img, (m, 86, m + 430, 246))
    badge_f = font(42, True)
    badge = "GEO GAS GIVEAWAY"
    bw = text_w(draw, badge, badge_f) + 56
    round_rect(draw, (w - m - bw, 112, w - m, 178), RED, None, radius=12)
    draw.text((w - m - bw + 28, 124), badge, font=badge_f, fill=WHITE)

    hf = fitted(draw, headline, w - 2 * m, 188, 108, True)
    draw.text((m, 292), headline, font=hf, fill=YELLOW, stroke_width=5, stroke_fill=BLACK)
    sf = fitted(draw, subline, w - 2 * m, 64, 38, False)
    draw.text((m, 500), subline, font=sf, fill=WHITE, stroke_width=3, stroke_fill=BLACK)

    paste_van(img, (m, 680, w - m, 1425))

    round_rect(draw, (m, 1490, w - m, 1770), (15, 18, 24, 238), RED, 5, 18)
    cf = fitted(draw, cta.upper(), 1150, 74, 42, True)
    draw.text((m + 56, 1534), cta.upper(), font=cf, fill=WHITE)
    msg = "Boiler repair  |  Boiler cover  |  24/7 emergency fixing"
    mf = fitted(draw, msg, 1220, 46, 30, True)
    draw.text((m + 58, 1628), msg, font=mf, fill=YELLOW)
    nf = fitted(draw, note, 1220, 34, 24, False)
    draw.text((m + 58, 1698), note, font=nf, fill=MUTED)
    draw_qr_panel(img, (w - m - 310, 1498, w - m - 36, 1762), "SCAN TO ENTER")

    draw_contacts(draw, (m, 1846, w - m, 2048), center=True)
    out = OUT / filename
    img.convert("RGB").save(out, quality=96)
    return out


def tube_ad() -> Path:
    size = (3840, 2160)
    img = make_bg(size).convert("RGBA")
    draw = ImageDraw.Draw(img, "RGBA")
    w, h = size
    m = 150

    paste_logo(img, (m, 112, m + 510, 282))
    eyebrow = "LONDON + SUSSEX BOILER HEROES"
    ef = font(52, True)
    draw.text((m, 326), eyebrow, font=ef, fill=YELLOW, stroke_width=3, stroke_fill=BLACK)

    headline = "BOILER COVER THAT TURNS UP"
    hf = fitted(draw, headline, 1660, 138, 76, True)
    draw.text((m, 442), headline, font=hf, fill=WHITE, stroke_width=5, stroke_fill=BLACK)
    sub = "Repairs, cover plans and emergency fixing from Geo Gas Services."
    sf = fitted(draw, sub, 1600, 54, 34, False)
    draw.text((m, 620), sub, font=sf, fill=MUTED, stroke_width=2, stroke_fill=BLACK)

    round_rect(draw, (m, 740, m + 1460, 1030), (15, 18, 24, 238), RED, 5, 18)
    bullets = [
        "24/7 peace of mind",
        "Competitive monthly rates",
        "Local London and Sussex teams",
    ]
    bf = font(50, True)
    y = 780
    for text in bullets:
        draw.ellipse((m + 52, y + 12, m + 82, y + 42), fill=YELLOW)
        draw.text((m + 112, y), text, font=bf, fill=WHITE)
        y += 78

    paste_van(img, (w - 1910, 438, w - 114, 1520))
    round_rect(draw, (m, 1162, m + 1460, 1350), RED, None, radius=16)
    cta = "WIN A YEAR'S COVER"
    ctaf = fitted(draw, cta, 1340, 86, 58, True)
    draw.text((m + 60, 1202), cta, font=ctaf, fill=WHITE)
    draw.text((m + 62, 1292), "Scan to enter on Facebook + Instagram", font=font(38, True), fill=YELLOW)

    draw_qr_panel(img, (m + 1210, 1116, m + 1608, 1514), "SCAN")
    round_rect(draw, (m, 1668, w - m, 1930), (12, 14, 18, 235), RED, 5, 16)
    draw_contacts(draw, (m + 70, 1718, w - m - 70, 1900), center=True)

    out = OUT / "geogas-brand-locked-van1-tube-ad-win-years-cover.png"
    img.convert("RGB").save(out, quality=96)
    return out


def proof(paths: list[Path]) -> Path:
    thumbs = []
    for path in paths:
        im = Image.open(path).convert("RGB")
        im.thumbnail((760, 760), Image.Resampling.LANCZOS)
        thumbs.append((path.name, im.copy()))
    width = 1640
    height = 1580
    sheet = Image.new("RGB", (width, height), (240, 242, 246))
    draw = ImageDraw.Draw(sheet)
    title = "Brand-locked van1 campaign proofs"
    draw.text((50, 32), title, font=font(40, True), fill=BLACK)
    positions = [(50, 110), (850, 110), (50, 910)]
    for (name, im), (x, y) in zip(thumbs, positions):
        sheet.paste(im, (x, y))
        draw.text((x, y + im.height + 12), name, font=font(22, True), fill=BLACK)
    out = OUT / "proof-brand-locked-van1-ads.jpg"
    sheet.save(out, quality=92)
    return out


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    paths = [
        social_square(
            "WIN A YEAR'S COVER",
            "A year of boiler cover peace of mind from Geo Gas Services.",
            "Follow + Like + Comment HERO",
            "Mock campaign. Cover level, eligibility and full T&Cs to be confirmed.",
            "geogas-brand-locked-van1-win-years-cover-square.png",
        ),
        social_square(
            "WIN A BOILER",
            "Boiler repair and replacement support from the GEO Gas team.",
            "Follow + Like + Comment BOILER",
            "Mock campaign. Prize details, install scope, eligibility and full T&Cs to be confirmed.",
            "geogas-brand-locked-van1-win-boiler-square.png",
        ),
        tube_ad(),
    ]
    paths.append(proof(paths))
    for path in paths:
        print(path)


if __name__ == "__main__":
    main()
