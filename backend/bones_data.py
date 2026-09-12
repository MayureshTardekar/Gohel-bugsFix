"""206 Human Bones Archive Dataset — grouped by anatomical region."""

BONE_REGIONS = [
    {
        "id": "skull",
        "name": "Skull",
        "parent": "Axial Skeleton",
        "count": 22,
        "description": "The bony framework of the head, protecting the brain and forming the face.",
    },
    {
        "id": "ossicles",
        "name": "Auditory Ossicles",
        "parent": "Axial Skeleton",
        "count": 6,
        "description": "Three tiny bones per ear (malleus, incus, stapes) transmitting sound vibrations.",
    },
    {
        "id": "hyoid",
        "name": "Hyoid",
        "parent": "Axial Skeleton",
        "count": 1,
        "description": "The floating U-shaped bone in the neck, anchor for the tongue.",
    },
    {
        "id": "spine",
        "name": "Vertebral Column",
        "parent": "Axial Skeleton",
        "count": 26,
        "description": "The spinal chassis: 24 vertebrae + sacrum + coccyx.",
    },
    {
        "id": "thoracic",
        "name": "Thoracic Cage",
        "parent": "Axial Skeleton",
        "count": 25,
        "description": "The rib fortress protecting heart and lungs (24 ribs + sternum).",
    },
    {
        "id": "pectoral",
        "name": "Pectoral Girdle",
        "parent": "Appendicular Skeleton",
        "count": 4,
        "description": "The shoulder frame connecting the arms to the torso.",
    },
    {
        "id": "upper_limbs",
        "name": "Upper Limbs",
        "parent": "Appendicular Skeleton",
        "count": 60,
        "description": "Arms and hands: from humerus to phalanges. Precision engines of motion.",
    },
    {
        "id": "pelvic",
        "name": "Pelvic Girdle",
        "parent": "Appendicular Skeleton",
        "count": 2,
        "description": "The hip cradle supporting the spine and transferring load to the legs.",
    },
    {
        "id": "lower_limbs",
        "name": "Lower Limbs",
        "parent": "Appendicular Skeleton",
        "count": 60,
        "description": "Legs and feet: from femur to phalanges. Load-bearing architecture.",
    },
]

BONES = [
    # ---- SKULL (22) ----
    ("Frontal", "skull", "Forms the forehead and roof of the eye sockets."),
    ("Parietal (L)", "skull", "Left parietal bone — forms the side and roof of the cranium."),
    ("Parietal (R)", "skull", "Right parietal bone — forms the side and roof of the cranium."),
    ("Temporal (L)", "skull", "Left temporal bone — houses the ear structures."),
    ("Temporal (R)", "skull", "Right temporal bone — houses the ear structures."),
    ("Occipital", "skull", "Rear of skull — contains foramen magnum for the spinal cord."),
    ("Sphenoid", "skull", "Butterfly-shaped bone at the base of the skull."),
    ("Ethmoid", "skull", "Delicate bone between the eyes, forming part of the nasal cavity."),
    ("Nasal (L)", "skull", "Left nasal bone — forms the bridge of the nose."),
    ("Nasal (R)", "skull", "Right nasal bone — forms the bridge of the nose."),
    ("Maxilla (L)", "skull", "Left upper jaw bone — holds upper teeth."),
    ("Maxilla (R)", "skull", "Right upper jaw bone — holds upper teeth."),
    ("Zygomatic (L)", "skull", "Left cheekbone."),
    ("Zygomatic (R)", "skull", "Right cheekbone."),
    ("Lacrimal (L)", "skull", "Left tear-duct bone in the eye socket."),
    ("Lacrimal (R)", "skull", "Right tear-duct bone in the eye socket."),
    ("Palatine (L)", "skull", "Left palate bone — forms part of the hard palate."),
    ("Palatine (R)", "skull", "Right palate bone — forms part of the hard palate."),
    ("Inferior Nasal Concha (L)", "skull", "Curled bone inside the left nasal cavity."),
    ("Inferior Nasal Concha (R)", "skull", "Curled bone inside the right nasal cavity."),
    ("Vomer", "skull", "Thin bone dividing the nasal cavity."),
    ("Mandible", "skull", "The lower jaw — only movable bone in the skull."),

    # ---- AUDITORY OSSICLES (6) ----
    ("Malleus (L)", "ossicles", "Hammer of the left inner ear."),
    ("Malleus (R)", "ossicles", "Hammer of the right inner ear."),
    ("Incus (L)", "ossicles", "Anvil of the left inner ear."),
    ("Incus (R)", "ossicles", "Anvil of the right inner ear."),
    ("Stapes (L)", "ossicles", "Stirrup — the smallest human bone (left)."),
    ("Stapes (R)", "ossicles", "Stirrup — the smallest human bone (right)."),

    # ---- HYOID (1) ----
    ("Hyoid", "hyoid", "The only free-floating bone — anchors the tongue."),
]

# Generate vertebrae 26
BONES += [(f"Cervical Vertebra C{i}", "spine", f"Neck vertebra number {i}.") for i in range(1, 8)]
BONES += [(f"Thoracic Vertebra T{i}", "spine", f"Upper-back vertebra number {i}.") for i in range(1, 13)]
BONES += [(f"Lumbar Vertebra L{i}", "spine", f"Lower-back vertebra number {i}.") for i in range(1, 6)]
BONES += [("Sacrum", "spine", "Fused triangular bone at the base of the spine.")]
BONES += [("Coccyx", "spine", "The tailbone — vestigial fused vertebrae.")]

# Thoracic cage 25 (24 ribs + sternum)
BONES += [(f"Rib {i} (L)", "thoracic", f"Left rib number {i}.") for i in range(1, 13)]
BONES += [(f"Rib {i} (R)", "thoracic", f"Right rib number {i}.") for i in range(1, 13)]
BONES += [("Sternum", "thoracic", "Breastbone — anchors the ribs at the front of the chest.")]

# Pectoral girdle 4
BONES += [
    ("Clavicle (L)", "pectoral", "Left collarbone."),
    ("Clavicle (R)", "pectoral", "Right collarbone."),
    ("Scapula (L)", "pectoral", "Left shoulder blade."),
    ("Scapula (R)", "pectoral", "Right shoulder blade."),
]

# Upper limbs 60 (30 each side)
def _arm(side):
    return [
        (f"Humerus ({side})", "upper_limbs", f"Upper arm bone ({side} side)."),
        (f"Radius ({side})", "upper_limbs", f"Lateral forearm bone ({side})."),
        (f"Ulna ({side})", "upper_limbs", f"Medial forearm bone ({side})."),
        (f"Scaphoid ({side})", "upper_limbs", f"Boat-shaped wrist carpal ({side})."),
        (f"Lunate ({side})", "upper_limbs", f"Moon-shaped wrist carpal ({side})."),
        (f"Triquetrum ({side})", "upper_limbs", f"Pyramid wrist carpal ({side})."),
        (f"Pisiform ({side})", "upper_limbs", f"Pea-shaped wrist carpal ({side})."),
        (f"Trapezium ({side})", "upper_limbs", f"Wrist carpal at the base of the thumb ({side})."),
        (f"Trapezoid ({side})", "upper_limbs", f"Wrist carpal beside the trapezium ({side})."),
        (f"Capitate ({side})", "upper_limbs", f"Largest wrist carpal ({side})."),
        (f"Hamate ({side})", "upper_limbs", f"Hook-shaped wrist carpal ({side})."),
    ] + [(f"Metacarpal {i} ({side})", "upper_limbs", f"Palm bone {i} ({side}).") for i in range(1, 6)] \
      + [(f"Proximal Phalanx {i} ({side})", "upper_limbs", f"Base finger bone {i} ({side}).") for i in range(1, 6)] \
      + [(f"Middle Phalanx {i} ({side})", "upper_limbs", f"Middle finger bone {i} ({side}).") for i in range(2, 6)] \
      + [(f"Distal Phalanx {i} ({side})", "upper_limbs", f"Tip finger bone {i} ({side}).") for i in range(1, 6)]

BONES += _arm("L") + _arm("R")

# Pelvic girdle 2 (hip bones)
BONES += [
    ("Hip Bone (L)", "pelvic", "Left os coxae (fused ilium + ischium + pubis)."),
    ("Hip Bone (R)", "pelvic", "Right os coxae (fused ilium + ischium + pubis)."),
]

# Lower limbs 60 (30 each side)
def _leg(side):
    return [
        (f"Femur ({side})", "lower_limbs", f"Thigh bone — longest human bone ({side})."),
        (f"Patella ({side})", "lower_limbs", f"Kneecap ({side})."),
        (f"Tibia ({side})", "lower_limbs", f"Shin bone ({side})."),
        (f"Fibula ({side})", "lower_limbs", f"Calf bone ({side})."),
        (f"Talus ({side})", "lower_limbs", f"Ankle bone connecting to tibia ({side})."),
        (f"Calcaneus ({side})", "lower_limbs", f"Heel bone ({side})."),
        (f"Navicular ({side})", "lower_limbs", f"Boat-shaped foot bone ({side})."),
        (f"Cuboid ({side})", "lower_limbs", f"Cube-shaped foot bone ({side})."),
        (f"Medial Cuneiform ({side})", "lower_limbs", f"Innermost wedge foot bone ({side})."),
        (f"Intermediate Cuneiform ({side})", "lower_limbs", f"Middle wedge foot bone ({side})."),
        (f"Lateral Cuneiform ({side})", "lower_limbs", f"Outer wedge foot bone ({side})."),
    ] + [(f"Metatarsal {i} ({side})", "lower_limbs", f"Long foot bone {i} ({side}).") for i in range(1, 6)] \
      + [(f"Proximal Phalanx (foot) {i} ({side})", "lower_limbs", f"Base toe bone {i} ({side}).") for i in range(1, 6)] \
      + [(f"Middle Phalanx (foot) {i} ({side})", "lower_limbs", f"Middle toe bone {i} ({side}).") for i in range(2, 6)] \
      + [(f"Distal Phalanx (foot) {i} ({side})", "lower_limbs", f"Tip toe bone {i} ({side}).") for i in range(1, 6)]

BONES += _leg("L") + _leg("R")

# Build final list with specimen numbers
def get_archive():
    region_map = {r["id"]: r for r in BONE_REGIONS}
    items = []
    for i, (name, region_id, desc) in enumerate(BONES, start=1):
        items.append({
            "specimen": f"OSTEON-{i:03d}",
            "number": i,
            "name": name,
            "region": region_map[region_id]["name"],
            "parent": region_map[region_id]["parent"],
            "region_id": region_id,
            "description": desc,
        })
    return items

def get_regions():
    return BONE_REGIONS

# Sanity check length (206)
if __name__ == "__main__":
    print(len(BONES))
