// import { ChangeEvent, forwardRef, useRef } from 'react';

// import { type InputFieldProps } from '@/components/InputField';
// import { Input } from '@/components/ui/Input';

// interface PhoneFieldProps extends InputFieldProps {
//   onComplete?: () => void;
//   onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
// }

// const PhoneField = forwardRef<HTMLInputElement, PhoneFieldProps>(({ onComplete, onChange }, ref) => {
//   const carrierRef = useRef<HTMLSelectElement>(null);
//   const frontRef = useRef<HTMLInputElement>(null);
//   const backRef = useRef<HTMLInputElement>(null);

//   const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
//     if (carrierRef.current && frontRef.current && backRef.current) {
//       const value = carrierRef.current.value + frontRef.current.value + backRef.current.value;

//       const newEvent: ChangeEvent<HTMLInputElement> = {
//         ...event,
//         target: {
//           ...event.target,
//           value,
//         },
//       };

//       onChange?.(newEvent);
//     }
//   };

//   const handleFrontComplete = () => backRef.current?.focus();
//   const handleBackComplete = () => {
//     if (frontRef.current?.value.length === 4 && backRef.current?.value.length === 4) onComplete?.();
//     else frontRef.current?.focus();
//   };

//   return (
//     <div ref={ref} className="flex gap-2">
//       <select ref={carrierRef} className="w-20">
//         <option value="010">010</option>
//         <option value="011">011</option>
//       </select>

//       <Input
//         ref={frontRef}
//         className="flex-1"
//         variant="underline"
//         maxLength={4}
//         onlyNum
//         onChange={handleInputChange}
//         onComplete={handleFrontComplete}
//       />

//       <Input
//         ref={backRef}
//         className="flex-1"
//         variant="underline"
//         maxLength={4}
//         onlyNum
//         onChange={handleInputChange}
//         onComplete={handleBackComplete}
//       />
//     </div>
//   );
// });

// export default PhoneField;
