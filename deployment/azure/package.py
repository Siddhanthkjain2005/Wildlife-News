"""Create a source deployment ZIP without local secrets or runtime data."""
from pathlib import Path
import subprocess
import sys
from zipfile import ZipFile, ZIP_DEFLATED

root = Path(__file__).resolve().parents[2]
output = Path(sys.argv[1] if len(sys.argv) > 1 else '/tmp/wildguard-deployment.zip')
tracked = subprocess.check_output(['git', 'ls-files', '-z'], cwd=root).decode().split('\0')
allowed = ('app/', 'alembic/', 'deployment/azure/')
root_files = {'requirements.txt', 'alembic.ini'}
paths = {root / name for name in tracked if name and (name.startswith(allowed) or name in root_files)}
paths.update((root / 'app/static/react-build').rglob('*'))
with ZipFile(output, 'w', ZIP_DEFLATED) as archive:
    for path in sorted(paths):
        if path.is_file() and '__pycache__' not in path.parts and path.name != '.DS_Store':
            archive.write(path, path.relative_to(root))
print(f'Created {output} ({output.stat().st_size:,} bytes)')
