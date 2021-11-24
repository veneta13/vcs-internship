import re
from pathlib import Path

p = Path(__file__).with_name("task1.3.8_text.txt")
with p.open('r') as f:
    string = f.read()

result1 = re.findall('\\d{4}', string)
print(result1)

result2 = len(re.findall("Dickens ", string))
print(result2)
