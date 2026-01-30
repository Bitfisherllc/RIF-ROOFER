'use client';

import RooferFullApplyForm from './RooferFullApplyForm';

export default function PreferredContractorApplyForm({
  embedded = false,
  onBack,
  idPrefix = '',
}: {
  embedded?: boolean;
  onBack?: () => void;
  idPrefix?: string;
}) {
  return (
    <RooferFullApplyForm
      variant="preferred"
      embedded={embedded}
      onBack={onBack}
      idPrefix={idPrefix}
    />
  );
}
