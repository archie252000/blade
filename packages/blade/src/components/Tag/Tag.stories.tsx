import React from 'react';
import type { DOMAttributes } from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Title } from '@storybook/addon-docs';
import type { TagProps } from './Tag';
import { Tag } from './Tag';
import { Sandbox } from '~utils/storybook/Sandbox';
import StoryPageWrapper from '~utils/storybook/StoryPageWrapper';
import { getStyledPropsArgTypes } from '~components/Box/BaseBox/storybookArgTypes';
import { Box } from '~components/Box';
import { Button } from '~components/Button';
import { TextInput } from '~components/Input/TextInput';
import { isReactNative } from '~utils';
import { PlusIcon } from '~components/Icons';
import iconMap from '~components/Icons/iconMap';

const Page = (): React.ReactElement => {
  return (
    <StoryPageWrapper
      figmaURL={{
        paymentTheme:
          'https://www.figma.com/file/jubmQL9Z8V7881ayUD95ps/Blade---Payment-Light?node-id=28435%3A581488',
        bankingTheme:
          'https://www.figma.com/file/sAdplk2uYnI2ILnDKUxycW/Blade---Banking-Dark?node-id=15234%3A480939',
      }}
      componentName="Tag"
      componentDescription="These are set of interactive keywords that help organise & categorise objects. Tags can be added or removed from an object by the users."
    >
      <Title>Usage</Title>
      <Sandbox>
        {`
        import React from 'react';
        import { Tag, FileTextIcon } from '@razorpay/blade/components';
        
        function App(): React.ReactElement {
          const [isTagVisible, setIsTagVisible] = React.useState(true);

          return (
            isTagVisible 
            ? <Tag
                icon={FileTextIcon}
                onDismiss={() => {
                  console.log('Unpaid Tag dismissed');
                  setIsTagVisible(false);
                }}
              >
                Unpaid
              </Tag>
            : null
          )
        }

        export default App;
        `}
      </Sandbox>
    </StoryPageWrapper>
  );
};

export default {
  title: 'Components/Tag',
  component: Tag,
  argTypes: {
    ...getStyledPropsArgTypes(),
    icon: {
      name: 'icon',
      type: 'select',
      options: Object.keys(iconMap),
      mapping: iconMap,
    },
    _isVirtuallyFocussed: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      page: Page,
    },
  },
} as Meta<TagProps>;

const TagTemplate: ComponentStory<typeof Tag> = ({ children, ...args }) => {
  const [isTagVisible, setIsTagVisible] = React.useState(true);
  return (
    <Box>
      {isTagVisible ? (
        <Tag {...args} onDismiss={() => setIsTagVisible(false)}>
          {children}
        </Tag>
      ) : null}
    </Box>
  );
};

export const Default = TagTemplate.bind({});
Default.args = {
  children: 'Unpaid',
  icon: 'FileTextIcon',
} as TagProps & { icon: string };

export const Disabled = TagTemplate.bind({});
Disabled.args = {
  children: 'Disabled Tag',
  icon: 'FileTextIcon',
  isDisabled: true,
} as TagProps & { icon: string };

const CrossPlatformForm = ({
  children,
  onSubmit,
}: {
  children: React.ReactElement[];
  onSubmit: DOMAttributes<HTMLFormElement>['onSubmit'];
}): React.ReactElement => {
  if (isReactNative()) {
    return <Box>{children}</Box>;
  }

  return <form onSubmit={onSubmit}>{children}</form>;
};

export const ControlledTags = (props: TagProps): React.ReactElement => {
  const [inputValue, setInputValue] = React.useState('');
  const [tags, setTags] = React.useState<string[]>([]);

  const addTag = (): void => {
    // Add input value to tags and clear the input value
    if (inputValue) {
      setTags([...tags, inputValue]);
      setInputValue('');
    }
  };

  const removeTag = (tagName: TagProps['children']): void => {
    setTags(tags.filter((tagNameValue) => tagNameValue !== tagName));
  };

  return (
    <Box>
      <Box paddingY="spacing.4">
        {tags.map((tagName) => (
          <Tag
            key={tagName}
            {...props}
            marginRight="spacing.2"
            onDismiss={() => removeTag(tagName)}
          >
            {tagName}
          </Tag>
        ))}
      </Box>
      <Box>
        <CrossPlatformForm
          onSubmit={(e) => {
            e.preventDefault();
            addTag();
          }}
        >
          <TextInput
            label="Tag Label"
            value={inputValue}
            onChange={({ value }) => setInputValue(value ?? '')}
            {...{ onSubmit: isReactNative() ? () => addTag() : undefined }}
          />
          <Button
            icon={PlusIcon}
            iconPosition="right"
            variant="secondary"
            marginTop="spacing.2"
            type="submit"
            {...{ onClick: isReactNative() ? () => addTag() : undefined }}
          >
            Create Tag
          </Button>
        </CrossPlatformForm>
      </Box>
    </Box>
  );
};
