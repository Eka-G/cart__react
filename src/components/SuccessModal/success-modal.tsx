"use client";

import { Button, Modal, Typography } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useAppSelector } from "@hooks";
import { selectCartAmount } from "@store/shoppingCart";
import styles from "./style.module.scss";

const { Text } = Typography;

interface ModalProps {
  isModalOpen: boolean;
  handleOk: () => void;
}

const SuccessModal = ({ isModalOpen, handleOk }: ModalProps) => {
  const cartAmount = useAppSelector(selectCartAmount);

  return (
    <Modal
      title="Спасибо за заказ!"
      open={isModalOpen}
      footer={<Button onClick={handleOk}>ОК</Button>}
    >
      <CheckCircleOutlined className={styles.modal__success_icon} />
      <Text>Заказ успешно оформлен.</Text>
    </Modal>
  );
};

export default SuccessModal;
