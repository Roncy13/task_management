export const Choices = {
  Global: 'Global',
  Directory: 'Directory',
  Default: 'Default'
};

export const DirectoryType = () => ({
  name: 'type',
  type: 'list',
  choices: Object.values(Choices),
  message: 'Please Choose what directory type'
});

export default {
  Choices,
  DirectoryType
}