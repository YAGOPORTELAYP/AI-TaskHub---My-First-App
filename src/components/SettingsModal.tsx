import { Modal, Button } from '@mantine/core';
import { ThemeSelector } from './ThemeSelector';
import { useState } from 'react';
import { IconSettings } from '@tabler/icons-react';

export function SettingsModal() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Button
        leftIcon={<IconSettings size={20} />}
        variant="subtle"
        onClick={() => setOpened(true)}
      >
        Configurações
      </Button>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Configurações"
        size="lg"
      >
        <ThemeSelector />
      </Modal>
    </>
  );
}