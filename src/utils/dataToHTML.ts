import { PAY_CYCLE_TEXT } from '@/constant/payCycle';
import { ContractData } from '@/types/contract';
import { PersonalData } from '@/types/personal';

export const dataToHTML = (personal: PersonalData, contract: ContractData): string => {
  return `
    <h3>근무자 정보</h3>
    <p>이름: <strong>${personal.name}</strong></p>
    <p>연락처: <strong>${personal.phone}</strong></p>
    <p>주소: <strong>${personal.address}</strong></p>
    <p>은행명: <strong>${personal.bank}</strong></p>
    <p>계좌번호: <strong>${personal.bankAccount}</strong></p>
    <br />
    <h3>계약 정보</h3>
    <p>소속 업체: <strong>${contract.companyName}</strong></p>
    <p>급여: <strong>${contract.pay.toLocaleString()}원</strong></p>
    <p>급여 주기: <strong>${PAY_CYCLE_TEXT[contract.payCycle]}급</strong></p>
    <p>급여일: <strong>${contract.payDate}일</strong></p>      
    <p>계약 기간: <strong>${contract.startDate}</strong> ~ <strong>${contract.endDate}</strong></p>      
  `;
};
