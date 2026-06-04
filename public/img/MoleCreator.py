import cv2 as cv
from PIL import Image
import os

xs = [500, 450, 400]
deletePNGs = True

for i in range(101):
    mole = cv.imread("Mole.png", cv.IMREAD_UNCHANGED)
    iString = str(i)
    cv.putText(mole, iString, (xs[len(iString)-1], 530), cv.FONT_HERSHEY_TRIPLEX, 5,
               (0, 0, 0, 255), 5, cv.LINE_AA)
    cv.imwrite(f"numberedMoles/Mole_{i}.png", mole)

    mole = Image.open(f"numberedMoles/Mole_{i}.png")
    mole.save(f"numberedMoles/Mole_{i}.webp", format="WEBP", quality=60)

    if deletePNGs:
        os.remove(f"numberedMoles/Mole_{i}.png")
