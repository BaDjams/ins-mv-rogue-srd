"""Télécharge N visages depuis thispersondoesnotexist.com dans un dossier local.

Usage:
    python tools/scrape_faces.py [--count 50] [--out public/faces] [--delay 1.5]

Chaque requête renvoie un visage différent (pas d'API, juste un GET).
Les images sont nommées face_001.jpg, face_002.jpg, etc.
Les images déjà présentes sont skippées (reprise possible).
"""
import argparse
import os
import time
import urllib.request
import urllib.error

URL = "https://thispersondoesnotexist.com/"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
    "Referer": "https://thispersondoesnotexist.com/",
}

DEFAULT_OUT = os.path.join(os.path.dirname(__file__), "..", "public", "faces")


def download_one(path: str) -> bool:
    req = urllib.request.Request(URL, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = resp.read()
        if not data or data[:2] != b"\xff\xd8":
            print(f"  réponse non-JPEG ignorée")
            return False
        with open(path, "wb") as f:
            f.write(data)
        return True
    except urllib.error.URLError as e:
        print(f"  erreur réseau: {e}")
        return False


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--count", type=int, default=50, help="Nombre d'images à télécharger (défaut: 50)")
    parser.add_argument("--out", default=DEFAULT_OUT, help="Dossier de destination")
    parser.add_argument("--delay", type=float, default=1.5, help="Délai entre requêtes en secondes (défaut: 1.5)")
    args = parser.parse_args()

    os.makedirs(args.out, exist_ok=True)

    existing = {f for f in os.listdir(args.out) if f.startswith("face_") and f.endswith(".jpg")}
    existing_indices = set()
    for name in existing:
        try:
            existing_indices.add(int(name[5:8]))
        except ValueError:
            pass

    next_index = 1
    downloaded = 0
    skipped = 0

    print(f"Destination : {os.path.abspath(args.out)}")
    print(f"Cible       : {args.count} images  |  délai : {args.delay}s")
    if existing:
        print(f"Existantes  : {len(existing)} images (skippées)")
    print()

    while downloaded < args.count:
        while next_index in existing_indices:
            next_index += 1

        filename = f"face_{next_index:03d}.jpg"
        filepath = os.path.join(args.out, filename)
        print(f"[{downloaded + 1:>3}/{args.count}] {filename} ...", end=" ", flush=True)

        if download_one(filepath):
            size_kb = os.path.getsize(filepath) // 1024
            print(f"OK ({size_kb} Ko)")
            downloaded += 1
        else:
            skipped += 1
            if skipped >= 5:
                print("Trop d'erreurs consécutives, arrêt.")
                break
            next_index += 1
            continue

        existing_indices.add(next_index)
        next_index += 1

        if downloaded < args.count:
            time.sleep(args.delay)

    print(f"\nTerminé : {downloaded} images téléchargées dans {os.path.abspath(args.out)}")


if __name__ == "__main__":
    main()
