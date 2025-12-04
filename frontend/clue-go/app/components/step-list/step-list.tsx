export function StepsList({ experienceId, steps }: any) {
  return (
    <div className="space-y-3">
      {steps.map((s: any) => (
        <div key={s.id} className="p-3 bg-gray-100 rounded-md">
          <h3 className="font-semibold">
            {s.order}. {s.title}
          </h3>
          <p className="text-sm text-gray-600">{s.type}</p>
        </div>
      ))}
    </div>
  );
}
