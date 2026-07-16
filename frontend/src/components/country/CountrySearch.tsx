import Input from "../common/Input";

interface Props {
  value: string;
  onChange(value: string): void;
}

export default function CountrySearch({
  value,
  onChange,
}: Props) {
  return (
    <div className="mb-6 max-w-sm">
      <Input
        placeholder="Search country..."
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
      />
    </div>
  );
}