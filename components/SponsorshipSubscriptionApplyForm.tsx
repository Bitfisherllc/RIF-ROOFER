'use client';

import RooferFullApplyForm from './RooferFullApplyForm';

export default function SponsorshipSubscriptionApplyForm({
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
      variant="sponsored"
      embedded={embedded}
      onBack={onBack}
      idPrefix={idPrefix}
    />
  );
}
