.PHONY: crosslinks install-hooks validate

crosslinks:
	./scripts/generate_crosslinks.py

install-hooks:
	git config core.hooksPath .githooks

validate:
	./scripts/validate_content.sh
