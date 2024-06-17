'use client';

import { useState } from 'react';

import axios from 'axios';

import { Button } from '@/components/ui/Button';

export default function Home() {
  const [file, setFile] = useState<string>('');

  const handleClick = async () => {
    const formData = {
      subject: 'Hello',
      contentHtml: '<h1>World</h1>',
      attachments: [{ path: file }],
    };
    axios.post('/api/email', formData).then((res) => console.log(res.data));
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        const base64Sub = base64.toString();
        setFile(base64Sub);
      }
    };
  };

  return (
    <div className="">
      <input type="file" accept="image/*" onChange={handleChangeFile} />
      <Button onClick={handleClick}>MAIN</Button>
    </div>
  );
}
