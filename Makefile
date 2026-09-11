.PHONY: candidates crosslinks install-hooks validate

candidates crosslinks:
	./scripts/generate_crosslinks.py

install-hooks:
	git config core.hooksPath .githooks

validate:
	./scripts/validate_content.sh
