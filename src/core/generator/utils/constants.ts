export const Choices = {
  Global: 'Global',
  Directory: 'Directory',
  Default: 'Default'
};

export const DirectoryType = (component='') => ({
  name: 'type',
  type: 'list',
  choices: Object.values(Choices),
  message: `Please Choose what directory for ${component}`
});

export const DirectoryTypeFor = (component='') => ({
  name: 'type',
  type: 'list',
  choices: Object.values(Choices).filter(f => f !== Choices.Global),
  message: `Please Choose what directory type for ${component}`
});

export const RunPathDirectoryForAction = () => ({
  type: 'pathDirectoryForAction',
});

export default {
  Choices,
  DirectoryType,
  RunPathDirectoryForAction,
}