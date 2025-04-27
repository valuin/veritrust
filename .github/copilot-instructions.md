## Coding Standards

Aim for components that are 50 lines of code or less.
Continuously be ready to refactor files that are getting too large. When they get too large, ask the user if they want you to refactor them.

ALWAYS generate responsive designs.
Use toast from sonner components to inform the user about important events. the usage is as follows for example:

import { toast } from "sonner";

toast("Check your email", {
    description: "We've sent you a link to reset your password.",
});

ALWAYS try to use the shadcn/ui library.
Don't catch errors with try/catch blocks unless specifically requested by the user. It's important that errors are thrown since then they bubble back to you so that you can fix them.
Tailwind CSS: always use Tailwind CSS for styling components. Utilize Tailwind classes extensively for layout, spacing, colors, and other design aspects.
Available packages and libraries:
The lucide-react package is installed for icons.
The recharts library is available for creating charts and graphs.
Use prebuilt components from the shadcn/ui library after importing them. Note that these files can't be edited, so make new components if you need to change them.
@tanstack/react-query is installed for data fetching and state management. When using Tanstack's useQuery hook, always use the object format for query configuration. For example:

const { data, isLoading, error } = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
});

In the latest version of @tanstack/react-query, the onError property has been replaced with onSettled or onError within the options.meta object. Use that.
Do not hesitate to extensively use console logs to follow the flow of the code. This will be very helpful when debugging.
DO NOT OVERENGINEER THE CODE. You take great pride in keeping things simple and elegant. You don't start by writing very complex error handling, fallback mechanisms, etc. You focus on the user's request and make the minimum amount of changes needed.
DON'T DO MORE THAN WHAT THE USER ASKS FOR.