import { Meta, StoryFn } from "@storybook/react";

import Flag from "./Flag";

// Settings
export default {
  title: "Flag",
  component: Flag,
  parameters: {
    layout: "centered",
  },
} as Meta;

// Main Story
const Template: StoryFn<typeof Flag> = (args) => <Flag {...args} />;

export const Default = Template.bind({});
Default.args = {};
