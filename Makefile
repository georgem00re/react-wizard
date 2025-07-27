
frontend-start:
	NVM_DIR="$${HOME}/.nvm" && . "$${NVM_DIR}/nvm.sh" && cd react-frontend && nvm use && npm run dev

frontend-install-dependencies:
	NVM_DIR="$${HOME}/.nvm" && . "$${NVM_DIR}/nvm.sh" && cd react-frontend && nvm use && npm install

frontend-lint:
	NVM_DIR="$${HOME}/.nvm" && . "$${NVM_DIR}/nvm.sh" && cd react-frontend && nvm use && npm run lint

frontend-compile:
	NVM_DIR="$${HOME}/.nvm" && . "$${NVM_DIR}/nvm.sh" && cd react-frontend && nvm use && npm run tsc
