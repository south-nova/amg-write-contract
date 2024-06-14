import React from 'react';

const PersonalConsent = () => {
  return (
    <div className="overflow-y-auto p-4">
      <p className="mb-10">
        AMG(이하”회사”) (은)는 「개인정보보호법」에 따라 근로자의 개인정보 수집 · 이용에 대한 동의를 받고
        있습니다. 근로자는 아래 항목의 동의를 거부할 수 있으며 동의하지 않는 경우 동 정보를 기초로 한 회사의
        인사제도 운영에 있어 불이익을 받을 수 있음을 알려드립니다.
      </p>

      <section className="mb-7">
        <h2 className="mb-2 font-bold">[수집하는 개인정보 항목]</h2>
        <p className="mb-2">
          개인식별정보(성명), 고유식별정보(주민등록번호), 연락정보(주소, 휴대전화번호), 지급 계좌번호, 증빙
          이미지(신분증, 통장 사본) 등 기타소득 지급, 원천징수 및 납세를 위한 정보
        </p>
      </section>

      <section className="mb-7">
        <h2 className="mb-2 font-bold">[개인정보의 수집 이용 목적]</h2>
        <ul className="pl-1">
          <li>
            <span className="mr-2">-</span>
            개인 식별의 목적
          </li>
          <li>
            <span className="mr-2">-</span>
            기타소득세(지방소득세 포함) 원천징수, 원천징수 내역 신고 및 납세를 위해 제3자(국세청 및
            지방자치단체)에게 제공
          </li>
        </ul>
      </section>

      <section className="mb-7">
        <h2 className="mb-2 font-bold">[개인정보의 보유 및 이용기간]</h2>
        <p>
          위에 기재한 수집 이용의 목적을 모두 달성할 때까지 보유 이용 후, 법령에 따라 해당 개인 정보를
          보존해야 하는 의무가 존재하지 않는 이상, 6개월 이후 해당 개인정보가 불필요하게 된 것이 확인된 때에
          파기
        </p>
      </section>
    </div>
  );
};

export default PersonalConsent;
