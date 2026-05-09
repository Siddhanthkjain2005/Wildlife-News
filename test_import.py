import sys
import datetime
if not hasattr(datetime, 'UTC'):
    datetime.UTC = datetime.timezone.utc

try:
    import app.main
    print("SUCCESS")
except Exception as e:
    import traceback
    print("FAILED")
    traceback.print_exc()
