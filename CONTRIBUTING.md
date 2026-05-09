# Contributing to Wildlife Intelligence Platform

Thank you for your interest in contributing to the Wildlife Intelligence Platform! This project aims to leverage technology for wildlife conservation, and every contribution helps protect endangered species.

## 🚀 Getting Started

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🏗️ Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/Wildlife-News.git
cd Wildlife-News

# Backend setup
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# Frontend setup
cd updated_frontend
npm install
EMBED_BUILD=true npm run build
cd ..

# Run the development server
uvicorn app.main:app --reload
```

## 📝 Code Guidelines

- **Python**: Follow PEP 8 style guidelines
- **React**: Use functional components with hooks
- **Commits**: Use conventional commit messages (`feat:`, `fix:`, `docs:`, `chore:`)
- **Tests**: Add tests for new features when possible

## 🎯 Priority Areas

- 🌍 Regional language support improvements
- 📊 ML model accuracy enhancements
- 🗺️ Geocoding and mapping improvements
- 🔐 Security hardening
- 📱 Mobile UI responsiveness
- 📝 Documentation and examples

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.
