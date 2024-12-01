create policy "Allow insert for authenticated users"
on "storage"."objects"
as permissive
for insert
to public
with check ((auth.uid() IS NOT NULL));



