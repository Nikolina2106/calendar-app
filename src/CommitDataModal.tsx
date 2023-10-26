import React, {useRef} from 'react';
import styled from 'styled-components';
import {useOnClickOutside} from './hooks/useOnClickOutside';
import {DateTimeFormat, formatDateTime} from './util/dateTime.utils';

const Modal = styled.div<{$isOpen: boolean}>`
    display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
`;

const ModalOverlay = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(103, 102, 102, 0.8);
    z-index: 60000;
`;

const ModalBody = styled.div`
    width: 45rem;
    background-color: #fff;
    color: #494949;
    max-width: calc(100% - 30px);
    max-height: 100vh;
    overflow-y: auto;
    padding: 0.5rem 2rem 2rem 2rem;
    @media (max-width: 1160px) {
        max-width: 95%;
    }
`;

const ModalHeader = styled.div`
    color: #222222;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Title = styled.h2`
    color: #222222;
    font-size: 1.1875em;
    font-weight: 600;
`;

const ModalCloseButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    width: 1.5rem;
    height: 1.5rem;
    position: relative;

    &:before,
    &:after {
        background-color: #000;
        content: '';
        left: 50%;
        position: absolute;
        top: 50%;
        transform: translateX(-50%) translateY(-50%) rotate(45deg);
    }
    &::before {
        height: 2px;
        width: 50%;
    }
    &::after {
        height: 50%;
        width: 2px;
    }
`;

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
`;

const ContentItem = styled.div`
    display: flex;
    flex-direction: row;
`;

interface CommitDataModalProps {
    isOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    commitData: any;
}

export default function CommitDataModal(props: CommitDataModalProps): JSX.Element {
    const {isOpen, setIsModalOpen, commitData} = props;

    const dropdownRef = useRef(null);
    useOnClickOutside(dropdownRef, () => {
        if (isOpen) setIsModalOpen(false);
    });

    return (
        <Modal $isOpen={isOpen}>
            <ModalOverlay>
                <ModalBody ref={dropdownRef}>
                    <ModalHeader>
                        <Title>Commit data</Title>
                        <ModalCloseButton onClick={() => setIsModalOpen(false)} />
                    </ModalHeader>
                    <ModalContent>
                        <ContentItem>
                            <p>
                                <strong>Message:</strong> {commitData.commit?.message}
                            </p>
                        </ContentItem>
                        <ContentItem>
                            <p>
                                <strong>Date:</strong> {formatDateTime(commitData.commit?.author.date, DateTimeFormat.DATE_TIME)}
                            </p>
                        </ContentItem>
                        <ContentItem>
                            <p>
                                <strong>Author:</strong> {commitData.author?.login}
                            </p>
                        </ContentItem>
                    </ModalContent>
                </ModalBody>
            </ModalOverlay>
        </Modal>
    );
}
