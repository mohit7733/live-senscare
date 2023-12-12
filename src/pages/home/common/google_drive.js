import { useEffect } from 'react';
import useDrivePicker from 'react-google-drive-picker'


function Google_drive() {
    const [openPicker, data, authResponse] = useDrivePicker();
    // const customViewsArray = [new google.picker.DocsView()]; // custom view
    const handleOpenPicker = () => {
        openPicker({
            clientId: "401374289520-07jess9b107in3rtso238806gr7r9nhi.apps.googleusercontent.com",
            developerKey: "AIzaSyCEnFJzN9yEq3XUBKfhGjUH3M1AhPrZfwc",
            viewId: "DOCS",
            // token: token, // pass oauth token in case you already have one
            showUploadView: true,
            showUploadFolders: true,
            supportDrives: true,
            multiselect: true,
            // customViews: customViewsArray, // custom view
            callbackFunction: (data) => {
                if (data.action == 'cancel') {
                    console.log('User clicked cancel/close button')
                }
                console.log(data)
            },
        })
    }


    useEffect(() => {
        console.log(data);
    }, [data])
    return (
        <div>
            <input type="radio" class="mail-radio" name="chk" name="family" onClick={() => handleOpenPicker()} />
        </div>
    );
}

export default Google_drive;