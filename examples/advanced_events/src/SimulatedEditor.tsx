import { useEffect, useState } from 'react';

export const SimulatedEditor = () => {
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [name, setName] = useState("Jo")

  useEffect(() => {
    const areYouSure = (e: BeforeUnloadEvent) => {
      if (unsavedChanges) {
        console.log('pretending to save', unsavedChanges)
        if (!confirm("You've got unsaved changes. Really want to leave?"))
          e.preventDefault();
      }
    }
    window.addEventListener('beforeunload', areYouSure);
    return () => window.removeEventListener('beforeunload', areYouSure);
  });
  return (
    <section className="SimulatedEditor">
      <p>{unsavedChanges ? "You have unsaved changes" : "You're good. "}</p>
      <input type='checkbox' checked={unsavedChanges} onChange={e => setUnsavedChanges(e.target.checked)} />
      <label htmlFor='name'>
        Name:
      </label>
      <input id='name' value={name} onChange={e => { setName(e.target.value); setUnsavedChanges(true) }} />
      <div />

      <a href="https://yahoo.com">Yahoo</a>
      <a href="https://google.com">Google</a>
      <a href="https://cnn.com">CNN</a>
    </section>
  )

}

