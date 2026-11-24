"""Porta-guardanapo Pinheiro v2 (ShopZone, 24/11) — desenho próprio.
Duas faces de pinheiro em 3 camadas com estrela de 5 pontas vazada, unidas por base retangular.
Vão interno de 25 mm para guardanapo dobrado (33x33 -> 16,5 cm). Imprime em pé, sem suporte.
v2: primeira versão do modelo de mesa (o anúncio antigo era argola).
v3 (24-11): corrige o canto (-62,0) descartado; pinheiro agora toca a base em toda a largura (antes só ~1/3)."""
from build123d import *
import math
W, H, E, VAO, BASE_H = 150.0, 150.0, 4.0, 25.0, 4.0
# contorno do pinheiro (lado direito, x>=0) — camadas com "ombro" arredondado
dir_ = [(62, 0), (62, 14), (40, 50), (52, 50), (30, 88), (41, 88), (18, 122), (26, 122), (0, H)]
pts = dir_ + [(-x, z) for x, z in reversed(dir_[:-1])]   # v3: inclui o canto (-62,0) -> borda de baixo reta e colada na base em toda a largura
pts = [p for i, p in enumerate(pts) if i == 0 or p != pts[i-1]]
with BuildSketch(Plane.XZ) as sk:
    with BuildLine():
        Polyline(*pts, close=True)
    make_face()
    # estrela de 5 pontas vazada
    R, r, cz = 21.0, 8.6, 62.0
    st = [(R * math.cos(math.radians(90 + 36 * k)) * (1 if k % 2 == 0 else r / R),
           cz + R * math.sin(math.radians(90 + 36 * k)) * (1 if k % 2 == 0 else r / R)) for k in range(10)]
    with BuildLine():
        Polyline(*st, close=True)
    make_face(mode=Mode.SUBTRACT)
face = sk.sketch
# arredonda os cantos: fecha (offset -) e abre (offset +) com arcos
face = offset(face, amount=-2.0, kind=Kind.ARC)
face = offset(face, amount=2.0, kind=Kind.ARC)
frente = extrude(face, amount=E)                       # Plane.XZ extrude vai para -Y
tras = frente.moved(Location((0, VAO + E, 0)))
base = Box(124, VAO + 2 * E, BASE_H, align=(Align.CENTER, Align.MIN, Align.MIN)).moved(Location((0, -E, 0)))
peca = frente + tras + base
bb = peca.bounding_box(); print('bbox', bb.min, bb.max, 'vol cm3', round(peca.volume / 1000, 1))
export_stl(peca, 'porta_guardanapo_pinheiro_v3.stl')
