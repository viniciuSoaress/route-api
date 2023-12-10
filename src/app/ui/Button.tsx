

type Props = {
  onClick(): void,
  children: React.ReactNode
}

export function Button({ onClick, children }: Props) {

  return (
    <button onClick={onClick}
     className='border rounded text-xs px-2 hover:opacity-70'
     >
      {children}
    </button>
  )
}