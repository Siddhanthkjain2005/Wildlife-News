
import sys

path = "/Users/swetha/Downloads/wildlife-live-poaching-news-system/app/services/intelligence.py"
with open(path, 'r') as f:
    content = f.read()

target = """        veto_terms = {
            "vietnam", "south africa", "kenya", "tanzania", "laos", "cambodia", "china", 
            "europe", "usa", "uk", "myanmar", "singapore", "thailand", "malaysia", 
            "indonesia", "bangladesh", "sri lanka", "dubai", "uae", "africa"
        }
        lower_text = text.lower()
        if any(term in lower_text for term in veto_terms):
            # Only allow if an Indian state/district is EXPLICITLY present
            if not (state or district):
                return False, 0.0
            
            # If the title explicitly mentions the international country as the primary location, drop it
            title_lower = lower_text.split(".")[0] # approximate title
            if any(term in title_lower for term in veto_terms) and not any(s in title_lower for s in INDIA_STATES):
                return False, 0.0
                
            india_score -= 0.20 # Heavier penalty for international mentions
            
        is_india = india_score >= settings.india_threshold and india_score >= (outside_prob - 0.05)
        return is_india, india_score"""

replacement = """        # Hard Veto for international trade hubs unless India is explicitly present
        if any(f" {term} " in f" {lower_text} " for term in STOP_COUNTRIES):
            # If a foreign country is mentioned, we require a STRONG India signal (state or district)
            if not (state or district):
                return False, 0.0
            
            # If the title starts with a foreign country name, it's likely noise
            words = lower_text.split()
            if words and words[0] in STOP_COUNTRIES:
                if not any(s.lower() in lower_text for s in INDIA_STATES):
                    return False, 0.0
            
            india_score -= 0.30 

        is_india = india_score >= settings.india_threshold and india_score >= (outside_prob - 0.05)
        return is_india, india_score"""

if target in content:
    new_content = content.replace(target, replacement)
    with open(path, 'w') as f:
        f.write(new_content)
    print("SUCCESS")
else:
    # Try with different indentation or slightly different text
    print("TARGET NOT FOUND")
    # Just find line 1320 to 1339 and replace
    lines = content.splitlines()
    # Check if lines look like the target
    if "veto_terms = {" in lines[1319]:
        new_lines = lines[:1319] + replacement.splitlines() + lines[1339:]
        with open(path, 'w') as f:
            f.write("\\n".join(new_lines) + "\\n")
        print("SUCCESS BY LINE NUMBER")
    else:
        print(f"LINE 1320: {lines[1319]}")
