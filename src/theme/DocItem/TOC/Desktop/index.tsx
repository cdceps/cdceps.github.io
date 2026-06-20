import React, {type ReactNode} from 'react';
import Desktop from '@theme-original/DocItem/TOC/Desktop';
import type DesktopType from '@theme/DocItem/TOC/Desktop';
import type {WrapperProps} from '@docusaurus/types';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import {CopyPageButton} from '@site/src/components/CopyPageButton';

type Props = WrapperProps<typeof DesktopType>;

const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/cdceps/cdceps.github.io/main';

// IDs de docs donde NO queremos mostrar el botón "Copiar página"
const EXCLUDED_DOC_IDS = ['readme'];

export default function DesktopWrapper(props: Props): ReactNode {
  const {metadata} = useDoc();

  const relativePath = metadata.source?.replace(/^@site\//, '');
  const mdUrl = relativePath ? `${GITHUB_RAW_BASE}/${relativePath}` : undefined;

  const isExcluded = EXCLUDED_DOC_IDS.includes(metadata.id);

  return (
    <>
      {mdUrl && !isExcluded && (
        <div style={{ marginBottom: '1rem' }}>
          <CopyPageButton mdUrl={mdUrl} />
        </div>
      )}
      <Desktop {...props} />
    </>
  );
}