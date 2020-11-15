npm run ncuUpdateMinor \
  && printf '\nVerify Available Major Updates\n\n' \
  && npm run ncuVerifyUpdateMajor \
  && printf '\n\n' \
  && git add package.json package-lock.json \
  && npm run linter \
  && npm test
