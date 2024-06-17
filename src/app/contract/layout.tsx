import Content from '@/layouts/Content';

interface ContractLayoutProps {
  children?: React.ReactNode;
}

const ContractLayout = ({ children }: ContractLayoutProps) => {
  return <Content className="flex-grow">{children}</Content>;
};

export default ContractLayout;
