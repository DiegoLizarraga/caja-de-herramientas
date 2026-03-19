from playwright.sync_api import sync_playwright

def verify_frontend():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # English configuration
        # Directly go to the english version of a game to verify it works
        page.goto("http://localhost:8000/a-wisho/games-en/auditivo/nivel-1/eco-palabras/index.html", wait_until="networkidle")

        page.screenshot(path="/home/jules/verification/game_en.png")
        print("English screenshot saved")

        # Portuguese
        page.goto("http://localhost:8000/a-wisho/games-pt/auditivo/nivel-1/eco-palabras/index.html", wait_until="networkidle")

        page.screenshot(path="/home/jules/verification/game_pt.png")
        print("Portuguese screenshot saved")

        browser.close()

if __name__ == "__main__":
    verify_frontend()
