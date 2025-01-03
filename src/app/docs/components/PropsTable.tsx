// src/app/docs/components/PropsTable.tsx
interface Prop {
    name: string
    type: string
    default?: string
    required?: boolean
    description: string
}

interface PropsTableProps {
    props: Prop[]
}

export function PropsTable({ props }: PropsTableProps) {
    return (
        <div className="mt-4 mb-8">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                    <tr className="border-b">
                        <th className="py-3 px-4 text-text-primary font-semibold">Prop</th>
                        <th className="py-3 px-4 text-text-primary font-semibold">Type</th>
                        <th className="py-3 px-4 text-text-primary font-semibold">Default</th>
                        <th className="py-3 px-4 text-text-primary font-semibold">Required</th>
                        <th className="py-3 px-4 text-text-primary font-semibold">Description</th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.map((prop) => (
                        <tr key={prop.name} className="border-b">
                            <td className="py-3 px-4 font-mono text-sm">{prop.name}</td>
                            <td className="py-3 px-4 font-mono text-sm text-primary">{prop.type}</td>
                            <td className="py-3 px-4 font-mono text-sm">{prop.default || '-'}</td>
                            <td className="py-3 px-4">{prop.required ? '✓' : '-'}</td>
                            <td className="py-3 px-4 text-text-secondary">{prop.description}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}