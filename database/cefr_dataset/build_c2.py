# -*- coding: utf-8 -*-
"""
Full CEFR Level C2 Vocabulary Builder (300 Words)
Mastery / Proficiency register for elite scholarship & competitive examinations.
"""

import json
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))
from database.cefr_dataset.build_c2_part1 import C2_PART1
from database.cefr_dataset.build_c2_part2 import C2_PART2
from database.cefr_dataset.build_c2_part3 import C2_PART3

def build_c2():
    all_c2 = C2_PART1 + C2_PART2 + C2_PART3
    print(f"Total raw C2 words defined: {len(all_c2)}")
    assert len(all_c2) == 300, f"Expected 300 C2 words, got {len(all_c2)}"
    
    words_data = []
    seen = set()
    for idx, item in enumerate(all_c2, start=1):
        word, pos, phonetic, meaning_th, meaning_en, example, synonyms, antonyms = item
        w_lower = word.lower().strip()
        if w_lower in seen:
            raise ValueError(f"Duplicate word in C2: {w_lower}")
        seen.add(w_lower)
        
        words_data.append({
            "id": f"v_c2_{idx:03d}",
            "word": w_lower,
            "part_of_speech": pos,
            "cefr_level": "C2",
            "phonetic": phonetic,
            "meaning_th": meaning_th,
            "meaning_en": meaning_en,
            "example_sentence": example,
            "synonyms": json.dumps(synonyms, ensure_ascii=False),
            "antonyms": json.dumps(antonyms, ensure_ascii=False),
            "frequency_tier": 1
        })
    
    with open("c:/MaMan/database/cefr_dataset/c2_words.json", "w", encoding="utf-8") as f:
        json.dump(words_data, f, ensure_ascii=False, indent=2)
    print("Successfully generated 300 C2 words to c2_words.json!")
    return words_data

if __name__ == "__main__":
    build_c2()
