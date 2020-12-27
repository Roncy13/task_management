export const Choices = {
  Global: 'Global',
  Directory: 'Directory',
  Default: 'Default'
};

export const apiPath = '{{HlprApiDirectory location}}/{{DashCase name}}.actions.ts';
export const apiPathComponent = '{{HlprCheckDirectory component type name location}}/{{DashCase name}}.{{component}}.ts';

export default {
  Choices,
  apiPath,
  apiPathComponent
}