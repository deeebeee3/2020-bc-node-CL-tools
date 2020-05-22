Info...

Add binary executable key to package.json:
  "bin": {
    "nls": "index.js"
  },


Run:
chmod +x index.js


Tell computer to use node to execute this file (in index.js): 
#!/usr/bin/env node


Link project - run from project root (make project globally available):
npm link


Now able to run nls from anywhere...

Command line:
which node - shows path where node installed..