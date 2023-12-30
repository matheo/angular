const { getJestProjects } = require('@nx/jest');

module.exports = {
  projects: [...getJestProjects(), '<rootDir>/apps/website/'],
};
