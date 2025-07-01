import { useState, useEffect, useContext, useRef } from 'react';
import { Box, styled } from '@mui/material';
import Footer from './Footer';
import Message from './Message';
import { AccountContext } from '../../../context/AccountProvider';
import { getMessages, newMessages } from '../../../service/api';

const Wrapper = styled(Box)`
    background-image: url(https://w0.peakpx.com/wallpaper/306/181/HD-wallpaper-whatsapp-walpaper-art-background-eallpaper-pattern-patterns.jpg);
    background-size: 50%;
`;

const Component = styled(Box)`
    height: 77vh;
    overflow-y: scroll;
`;

const Container = styled(Box)`
    padding: 1px 80px;
`;

const Messages = ({ person, conversation }) => {
    const [value, setValue] = useState('');
    const [messages, setMessages] = useState([]);
    const [newMessageFlag, setNewMessageFlag] = useState(false);
    const [file, setFile] = useState();
    const [image, setImage] = useState('');

    const { account, socket } = useContext(AccountContext);
    const scrollRef = useRef();

    useEffect(() => {
        if (!conversation?._id) return;

        const fetchMessages = async () => {
            const data = await getMessages(conversation._id);
            setMessages(data);
        };

        fetchMessages();
    }, [conversation?._id, person._id, newMessageFlag]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendText = async (e) => {
        const code = e.keyCode || e.which;
        if (code !== 13 || !value || !conversation?._id) return;

        const message = {
            senderId: account.sub,
            receiverId: person.sub,
            conversationId: conversation._id,
            type: file ? 'file' : 'text',
            text: file ? image : value,
        };

        socket.current.emit('sendMessage', message);
        await newMessages(message);

        setValue('');
        setFile();
        setImage('');
        setNewMessageFlag(prev => !prev);
    };

    return (
        <Wrapper>
            <Component>
                <Container>
                    {messages.map((message, index) => (
                        <Box ref={scrollRef} key={index}>
                            <Message message={message} />
                        </Box>
                    ))}
                </Container>
            </Component>
            <Footer
                sendText={sendText}
                value={value}
                setValue={setValue}
                file={file}
                setFile={setFile}
                setImage={setImage}
            />
        </Wrapper>
    );
};

export default Messages;
