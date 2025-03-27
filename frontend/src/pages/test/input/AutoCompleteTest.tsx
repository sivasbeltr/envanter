import React, { useState, useCallback } from 'react';
import { AutoComplete } from '../../../components/forms/AutoComplete';

const AutoCompleteTest: React.FC = () => {
    const [userSearchValue, setUserSearchValue] = useState<string>('');
    const [userSearchValue2, setUserSearchValue2] = useState<string>('');
    const [todoSearchValue, setTodoSearchValue] = useState<string>('');
    const [selectedUser, setSelectedUser] = useState<any | null>(null);

    const staticUsers = [
        { id: 1, label: 'Ahmet Yılmaz', email: 'ahmet@example.com', department: 'IT' },
        { id: 2, label: 'Ayşe Demir', email: 'ayse@example.com', department: 'İK' },
        { id: 3, label: 'Mehmet Kaya', email: 'mehmet@example.com', department: 'Muhasebe' },
        { id: 4, label: 'Zeynep Şahin', email: 'zeynep@example.com', department: 'Pazarlama' },
        { id: 5, label: 'Ali Öztürk', email: 'ali@example.com', department: 'Satış' },
        { id: 6, label: 'Fatma Çelik', email: 'fatma@example.com', department: 'Müşteri İlişkileri' },
        { id: 7, label: 'Mustafa Aydın', email: 'mustafa@example.com', department: 'Lojistik' },
        { id: 8, label: 'Emine Yıldız', email: 'emine@example.com', department: 'Üretim' },
        { id: 9, label: 'Hasan Korkmaz', email: 'hasan@example.com', department: 'Ar-Ge' },
        { id: 10, label: 'Hatice Güneş', email: 'hatice@example.com', department: 'Finans' },
    ];

    const userItemTemplate = useCallback((item: any, isHighlighted: boolean) => (
        <div className={`flex items-center ${isHighlighted ? 'font-bold' : ''}`}>
            <div className="flex-shrink-0 h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium">{item.label.charAt(0)}</span>
            </div>
            <div className="ml-3">
                <div className="text-sm font-medium">{item.label}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{item.email}</div>
            </div>
        </div>
    ), []);

    const todoItemTemplate = useCallback((item: any, isHighlighted: boolean) => (
        <div className={`${isHighlighted ? 'bg-blue-50 dark:bg-blue-900/30' : ''} p-1`}>
            <div className="text-sm font-medium">{item.label}</div>
            <div className="text-xs">
                <span className={`inline-block px-2 py-1 rounded-full text-xs ${item.completed
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                    }`}>
                    {item.completed ? 'Tamamlandı' : 'Devam Ediyor'}
                </span>
            </div>
        </div>
    ), []);

    const transformUsers = useCallback((data: any) => {
        return data.users.map((user: any) => ({
            id: user.id,
            label: `${user.firstName} ${user.lastName}`,
            email: user.email,
            company: user.company?.name || '',
            image: user.image,
        }));
    }, []);

    const transformTodos = useCallback((data: any) => {
        return data.map((todo: any) => ({
            id: todo.id,
            label: todo.title,
            completed: todo.completed,
        }));
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
                <h3 className="font-medium text-gray-800 dark:text-gray-200">API ile Otomatik Tamamlama</h3>
                <AutoComplete
                    label="Kullanıcı Ara"
                    placeholder="Kullanıcı adı ile arayın..."
                    apiUrl="https://dummyjson.com/users/search"
                    transformResponse={transformUsers}
                    value={userSearchValue}
                    onChange={setUserSearchValue}
                    onSelect={(item) => setSelectedUser(item)}
                    minChars={2}
                    debounceMs={500}
                    helperText="En az 2 karakter girin"
                />
                {selectedUser && (
                    <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                        <h4 className="text-sm font-medium">Seçilen Kullanıcı:</h4>
                        <pre className="text-xs mt-1 overflow-x-auto">
                            {JSON.stringify(selectedUser, null, 2)}
                        </pre>
                    </div>
                )}
            </div>

            <div className="space-y-4">
                <h3 className="font-medium text-gray-800 dark:text-gray-200">Özel Şablonlu AutoComplete</h3>
                <AutoComplete
                    label="Görev Ara"
                    placeholder="Görev adı ile arayın..."
                    apiUrl="https://jsonplaceholder.typicode.com/todos"
                    transformResponse={transformTodos}
                    value={todoSearchValue}
                    onChange={setTodoSearchValue}
                    minChars={3}
                    debounceMs={800}
                    itemTemplate={todoItemTemplate}
                    displayMode="table"
                    maxHeight={300}
                    helperText="Görev aramak için en az 3 karakter girin"
                />
            </div>

            <div className="space-y-4">
                <h3 className="font-medium text-gray-800 dark:text-gray-200">Yerel Veri ile AutoComplete</h3>
                <AutoComplete
                    label="Çalışan Ara"
                    placeholder="İsim ile arayın..."
                    items={staticUsers}
                    value={userSearchValue2}
                    onChange={setUserSearchValue2}
                    itemTemplate={userItemTemplate}
                    minChars={1}
                    helperText="Yerel kullanıcı listesinde arama yapar"
                />
            </div>

            <div className="space-y-4">
                <h3 className="font-medium text-gray-800 dark:text-gray-200">Izgara Görünümü</h3>
                <AutoComplete
                    label="Kullanıcı Ara"
                    placeholder="Arama..."
                    items={staticUsers}
                    value={userSearchValue2}
                    onChange={setUserSearchValue2}
                    displayMode="grid"
                    minChars={1}
                />
            </div>
        </div>
    );
};

export default AutoCompleteTest;