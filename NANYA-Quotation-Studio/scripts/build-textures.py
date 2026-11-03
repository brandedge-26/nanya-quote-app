"""Small material maps for the reference-based 3D enclosures. Requires Pillow."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import math

DEST = Path(__file__).resolve().parents[1] / 'dist' / 'models'
FONT = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
BOLD = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'

# A dark reflective pane; geometry defines each model's aperture and bracing.
im = Image.new('RGB', (192, 384)); pixels = im.load()
for y in range(im.height):
    for x in range(im.width):
        reflection = 21 * math.exp(-((x / 192 + y / 900 - .70) / .43) ** 2)
        tone = int(29 + 18 * (1-y / 384) + reflection)
        pixels[x,y] = (tone, tone+3, tone+5)
im.save(DEST / 'safety-glazing.png')

for model in ['nano-x8','nano-x10','nv-855','nv-1165','nv-1270','nv-1470','nv-1670']:
    compact = model in ['nano-x8','nano-x10','nv-855','nv-1165']
    w,h = 768,192 if compact else 94
    im=Image.new('RGB',(w,h)); d=ImageDraw.Draw(im)
    for y in range(h):
        value=int(158+17*math.sin(y/h*math.pi)+3*math.sin(y*2.9))
        d.line((0,y,w,y),fill=(value,value+2,value+1))
    f=ImageFont.truetype(BOLD,23)
    d.text((w-23,20 if compact else 16),model.upper(),font=f,fill=(34,37,37),anchor='ra')
    d.text((w/2,h-24 if compact else h-20),'www.nye-cnc.com',font=ImageFont.truetype(FONT,17),fill=(36,39,38),anchor='ms')
    im.save(DEST / (model+'-fascia.png'))

im=Image.new('RGB',(96,224),'#d4d7d4');d=ImageDraw.Draw(im)
d.rectangle((0,0,96,19),fill='#cf832f')
d.text((9,3),'CAUTION',font=ImageFont.truetype(BOLD,10),fill='#272b2b')
for section in range(3):
    y=27+section*64
    d.polygon([(7,y+19),(21,y),(35,y+19)],fill='#c69142')
    d.text((18,y+4),'!',font=ImageFont.truetype(BOLD,11),fill='#252a2d')
    for row in range(5):
        d.line((42,y+2+row*4,86-(row%2)*7,y+2+row*4),fill='#697170',width=1)
    for row in range(5):
        d.line((8,y+30+row*4,86-(row%3)*5,y+30+row*4),fill='#818886',width=1)
im.save(DEST / 'service-placard.png')
print('Updated glazing, apron identification and service placards.')
