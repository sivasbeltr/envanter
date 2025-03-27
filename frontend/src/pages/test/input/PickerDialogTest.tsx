import React, { useState } from 'react';
import { PickerDialog, PickerItem } from '../../../components/dialogs/PickerDialog';
import { Button } from '../../../components/common/Button';

/**
 * Test component for PickerDialog examples
 */
const PickerDialogTest: React.FC = () => {
    interface UserItem extends PickerItem {
        email: string;
        role: string;
    }

    const sampleUsers: UserItem[] = [
        { id: 1, label: 'Ahmet Yılmaz', description: 'IT Departmanı', email: 'ahmet@ornek.com', role: 'Yönetici', icon: <UserIcon /> },
        { id: 2, label: 'Ayşe Kaya', description: 'İnsan Kaynakları', email: 'ayse@ornek.com', role: 'Uzman', icon: <UserIcon /> },
        { id: 3, label: 'Mehmet Demir', description: 'Muhasebe', email: 'mehmet@ornek.com', role: 'Uzman', icon: <UserIcon /> },
        { id: 4, label: 'Zeynep Çelik', description: 'Pazarlama', email: 'zeynep@ornek.com', role: 'Yönetici', icon: <UserIcon /> },
        { id: 5, label: 'Mustafa Şahin', description: 'Satış', email: 'mustafa@ornek.com', role: 'Temsilci', icon: <UserIcon /> },
    ];

    const [pickerOpen, setPickerOpen] = useState<boolean>(false);
    const [pickerMultiOpen, setPickerMultiOpen] = useState<boolean>(false);
    const [pickerTemplateOpen, setPickerTemplateOpen] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<UserItem[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<UserItem[]>([]);

    // Custom template for picker items
    const customItemTemplate = (item: UserItem, isSelected: boolean, onSelect: () => void) => (
        <div
            onClick={onSelect}
            className={`p-3 rounded-md cursor-pointer flex items-start ${isSelected
                ? 'bg-blue-50 dark:bg-blue-900/30 border border-blue-500'
                : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
        >
            <div className="flex-shrink-0 h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mr-3">
                {item.icon || (
                    <svg className="h-6 w-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                )}
            </div>
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {item.label}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {item.role}
                    </p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    {item.description}
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400">
                    {item.email}
                </p>
            </div>
            {isSelected && (
                <div className="flex-shrink-0 ml-2 text-blue-500">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                </div>
            )}
        </div>
    );

    return (
        <div className="space-y-4">
            <div>
                <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">Tek Seçimli</p>
                <div className="flex items-center gap-2">
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={() => setPickerOpen(true)}
                    >
                        Kullanıcı Seç
                    </Button>
                    {selectedUser.length > 0 && (
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            Seçilen: {selectedUser[0].label}
                        </span>
                    )}
                </div>
            </div>

            <div>
                <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">Çoklu Seçim</p>
                <div className="flex items-center gap-2">
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={() => setPickerMultiOpen(true)}
                    >
                        Kullanıcılar Seç
                    </Button>
                    {selectedUsers.length > 0 && (
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            {selectedUsers.length} kullanıcı seçildi
                        </span>
                    )}
                </div>
            </div>

            <div>
                <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">Özel Şablon</p>
                <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setPickerTemplateOpen(true)}
                >
                    Özel Şablonla Seç
                </Button>
            </div>

            {/* Basic Picker */}
            <PickerDialog
                isOpen={pickerOpen}
                onClose={() => setPickerOpen(false)}
                title="Kullanıcı Seçin"
                subtitle="Listeden bir kullanıcı seçiniz"
                items={sampleUsers}
                selectedItems={selectedUser}
                onSelectionChange={setSelectedUser}
                searchable={true}
                size="md"
            />

            {/* Multiple Selection Picker */}
            <PickerDialog
                isOpen={pickerMultiOpen}
                onClose={() => setPickerMultiOpen(false)}
                title="Kullanıcılar Seçin"
                subtitle="Listeden bir veya daha fazla kullanıcı seçiniz"
                items={sampleUsers}
                selectedItems={selectedUsers}
                onSelectionChange={setSelectedUsers}
                multiple={true}
                maxSelections={3}
                searchable={true}
                size="md"
            />

            {/* Template Picker */}
            <PickerDialog
                isOpen={pickerTemplateOpen}
                onClose={() => setPickerTemplateOpen(false)}
                title="Özel Şablon ile Kullanıcı Seçin"
                subtitle="Daha detaylı bilgiler içeren kullanıcı listesi"
                items={sampleUsers}
                selectedItems={selectedUser}
                onSelectionChange={setSelectedUser}
                searchable={true}
                size="lg"
                itemTemplate={customItemTemplate}
            />
        </div>
    );
};

// Simple user icon component
function UserIcon() {
    return (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
    );
}

export default PickerDialogTest;
