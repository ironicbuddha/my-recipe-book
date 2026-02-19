.PHONY: install-hooks validate

install-hooks:
	git config core.hooksPath .githooks

validate:
	./scripts/validate_content.sh
